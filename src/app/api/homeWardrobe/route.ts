
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET(request:NextRequest){
    const stripe=new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET}`)
    console.log( 'Testing Data: ', process.env.NEXT_PUBLIC_STRIPE_SECRET)
    try {
        if(stripe){
            const tshirts=await stripe.products.search({
                query:'metadata[\'category\']:\'tshirt\''
            });
            const sneakers=await stripe.products.search({
                query:'metadata[\'category\']:\'sneakers\''
            });
            const poloShirts=await stripe.products.search({
                query:'metadata[\'category\']:\'polo-shirt\''
            });
            const desertBoots=await stripe.products.search({
                query:'metadata[\'category\']:\'desert-boots\''
            });
            const dressedFootwear=await stripe.products.search({
                query:'metadata[\'category\']:\'dressed-footwear\''
            });
            const list=[]
           // const tshirt=tshirts.data[0];
            const tshirt={
                label:'tshirt',
                images:tshirts.data[0].images,
                link:'/collections/t-shirts'
            }
            list.push(tshirt);
            //const sneaker=sneakers.data[0];
            const sneaker={
                label:'sneakers',
                images:sneakers.data[0].images,
                link:'/collections/sneakers'
            }
            list.push(sneaker);
            //const polo=poloShirts.data[0];
            const polo={
                label:'Polo-Shirts',
                images:poloShirts.data[0].images,
                link:'/collections/polo-shirts'
            }
            list.push(polo);
           // const boots=desertBoots.data[0];
           const boots={
            label:'desert-boots',
            images:desertBoots.data[0].images,
            link:'/collections/desert-boots'
           }
           list.push(boots);
            //const dressWear=dressedFootwear.data[0];
            const dressWear={
                label:'dressed-footwear',
                images:dressedFootwear.data[0].images,
                link:'/collections/dressed-footwear'
            }
            list.push(dressWear);
            console.log( 'list: ', list);
            console.log('tshirt Data: ', JSON.stringify(tshirt));
            return NextResponse.json({data:list});
        }
       return NextResponse.json({message:'Could not find data!'}, {status:304});
    } catch (error) {
        return NextResponse.json({message:error},{status:500});
    }

}