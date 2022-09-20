import urlJoin from 'url-join';


export default function url(routePath) {
    if (routePath.startsWith(import.meta.env.BASE_URL)) {
        return routePath;
    }

    return urlJoin(import.meta.env.BASE_URL, routePath);
}
