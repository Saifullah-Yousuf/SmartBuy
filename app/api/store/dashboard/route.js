import prisma from "@/lib/prisma";
import authSeller from "@/middlewares/authSeller";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// get Dshboard data for seller ( total products, total orders, total earnings)


export async function GET(request) {
    try {
        const { userId } = getAuth (request);
        const storeId = await authSeller(userId);  
        
        // Get al orders for seller
        const orders = await prisma.order.findMany ({
            where: { storeId: storeId }
        });

        // Get all products with ratings for seller
        const products = await prisma.product.findMany({
            where: { storeId }
        });

        const ratings = await prisma.rating.findMany({
            where: {
                productId: { in: products.map((product) => product.id) },
                include: { product: true, user: true }
            }
        });

        const dashboardData = {
            ratings,
            totalOrders: orders.length,
            totalEarnings: Math.round(orders.reduce((acc, order) => acc + order.totalAmount, 0)),
            totalProducts: products.length
        };

        return NextResponse.json({ dashboardData });

    } catch (error) {
        console.error(error);
        return NextResponse .json({ error: error.code || error.message }, { status: 400 });
    }
}