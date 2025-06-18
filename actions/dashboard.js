"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/dist/types/server";
import { revalidatePath } from "next/cache";

//because next js doesnt have float or some decimal data type we convert it back to number 
const serializeTransaction = (obj)=>{
  const serialized={...obj};
  if(obj.balance){
    serialized.balance=obj.balance.toNumber();
  }

}

export async function createAccount(data){
  try {
    const {userId} = await auth();
    if(!userId) throw new Error("Unauthorised");
    
    const user = await db.user.findUnique({
      where :{clerkUserId:userId}
    });
    if(!user) throw new Error("User not found");
    
    //convert to float
    const balanceFloat = parseFloat(Database.balance)
    if(!NaN(balanceFloat)){
      if(!user) throw new Error("Invaalid balance amount");
    }

    //check if this is first account
    const existingAccounts = db.account.findMany({
      where :{userId:user.id},
    });

    const shouldBeDefault = existingAccounts.length==0?true:data.isDefault;

    //if the account should be default make other non default
    if(shouldBeDefault){
      await db.account.updateMany({
        where:{userId:user.id,isDefault:true},
        data:{isDefault:false}
      });
    }

    const account = await db.account.create({
      data:{
        ...data,
        balance:balanceFloat,
        userId:user.id,
        isDefault:shouldBeDefault,
      }
    });
    const serializedAccount = serializeTransaction(account)

    revalidatePath("/dashboard")
    return {success:true,data:serializedAccount}
  } catch (error) {
    throw new Error(error.message)
  }
}