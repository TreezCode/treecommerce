const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log(req.body);

    try {
      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection:'auto',
        shipping_options: [
            { shipping_rate: 'shr_1MhpLlJUYhhpiYSZZYVxNeDh' }, // Free shipping
            { shipping_rate: 'shr_1MhpNRJUYhhpiYSZMZ33mqHz' }, // Fast shipping
        ],
        line_items: req.body.map((item) => {
          const projectId = process.env.SANITY_PROJECT_ID
          const img = item.image[0].asset._ref;
          let newImg;
          switch (img) {
            case img.includes('webp'):
              newImg = img.replace('image-', `https://cdn.sanity.io/images/${projectId}/production/`).replace('-webp', '.webp');
              break;
            case img.includes('jpeg'):
              newImg = img.replace('image-', `https://cdn.sanity.io/images/${projectId}/production/`).replace('-jpeg', '.jpeg');
              break;
            case img.includes('png'):
              newImg = img.replace('image-', `https://cdn.sanity.io/images/${projectId}/production/`).replace('-png', '.png');
              break;
            case img.includes('png'):
              newImg = img.replace('image-', `https://cdn.sanity.io/images/${projectId}/production/`).replace('-TIFF', '.TIFF');
              break;
            default:
              console.error(`Error, unexpected file format from ${img}.`);
          }
          return {
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.name,
                images: [newImg],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          }
        }),
        // [
        //   {
        //     // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        //     price: '{{PRICE_ID}}',
        //     quantity: 1,
        //   },
        // ],
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      };
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);

      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
