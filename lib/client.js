
import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
    projectId: 'lop0w17p',
    dataset: 'production',
    apiVersion: '2021-08-31',
    useCdn: true,
    token: "skf0pgj5XAdtibULOvud899kctArkEazTBMsK45S45krUnliimDIHmKQeVvhw587jSwZhh1Y9kb4Ic0tacwaZzd0pEhSWsh43VpaBAityyXO5MKlZvJQcZIwG64jCk8hl5xjBeGLOoNAHWpP1kwB8tk4Pe5XywrUF3LKToTQaH9I4YBNO2G9"
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

export const configuredSanityClient = sanityClient({
    projectId: 'lop0w17p',
    dataset: 'production',
    useCdn: true
});

