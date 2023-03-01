import sanityClient from '@sanity/client';
import ImageUrlBuilder  from '@sanity/image-url';

// export const writeClient = sanityClient({
//     projectId: 'foo7lpoy',
//     dataset: 'production',
//     apiVersion: '2023-03-01',
//     useCdn: false,
//     token: process.env.NEXT_PUBLIC_SANITY_TOKEN
// });

export const readClient = sanityClient({
    projectId: 'foo7lpoy',
    dataset: 'production',
    apiVersion: '2023-03-01',
    useCdn: true
});

const builder = ImageUrlBuilder(readClient);

export const urlFor = (source) => builder.image(source);