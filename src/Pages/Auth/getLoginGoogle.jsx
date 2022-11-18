// export function getLoginGoogle(from) {
//     const rootURI = 'http://localhost:8000/auth/google';

//     const options = {
//         client_id: '1045502639246-sblk4nulnv1r5vg4p01q62pmfksvg8bd.apps.googleusercontent.com',
//         redirect_uri: 'http://localhost:8000/auth/google/callback',
//         scope: 'https://www.googleapis.com/auth/userinfo.email',
//         response_type: 'code',
//         state: from,
//     };
//     const qs = new URLSearchParams(options);

//     return `${rootURI}?${qs.stringify(options)}`;
// }