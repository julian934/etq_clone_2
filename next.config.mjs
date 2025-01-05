/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects(){
        return [
            {
                source:'/',
                destination: '/home',
                permanent:true
            }
        ]
    },
    images:{
        domains:['files.stripe.com']
    }
};

export default nextConfig;
