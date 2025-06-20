"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { accountSchema } from "@/app/lib/schema";

const CreateAccountDrawer = ({children}) => {
    const [open,setOpen]=useState(false);

    const {register,handleSubmit,formState:{errors},setValue,watch,reset}=useForm({
      resolver: zodResolver(accountSchema),
      defaultValues:{
        name:"",
        type:"CURRENT",
        balance:"",
        isDefault:false,
      }
    });
    
  const onSubmit=  async (data) => {
    console.log(data);
  }
  return (
    <Drawer open = {open} onOpenChange={setOpen}>
  <DrawerTrigger asChild>{children}</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Create New Account</DrawerTitle>
    </DrawerHeader>
    <div className='px-4 pb-4'>
      <form action="" className='space-y-4' onSubmit={handleSubmit(onSubmit)}>  
        <div className='space-y-2'>
          <label htmlFor="name" className='text-small font-medium'>Account Name</label>
          <Input id="name" placeholder="eg. Main Checking" {...register("name")}/>
          {errors.name &&(
            <p className='text-sm text-red-500'>{errors.name.message} </p>
          )}
        </div>
        <div className='space-y-2'>
          <label htmlFor="type" className='text-small font-medium'>Account Type</label>
          <Select onValueChange={(value)=>setValue("type",value)}
            defaultValue={watch("type")}
            >
            <SelectTrigger id='type'>
              <SelectValue placeholder="Select Type"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CURRENT">Current</SelectItem>
              <SelectItem value="SAVINGS">Savings</SelectItem>
            </SelectContent>
          </Select>
          {errors.type &&(
            <p className='text-sm text-red-500'>{errors.type.message} </p>
          )}
        </div>
        <div className='space-y-2'>
          <label htmlFor="balance" className='text-small font-medium'>Initial Balance</label>
          <Input id="balance" placeholder="eg. Main Checking" {...register("balance")}/>
          {errors.balance &&(
            <p className='text-sm text-red-500'>{errors.balance.message} </p>
          )}
        </div>
        <div className='flex items-center justify-between rounded-lg border p-3'>
          <div className="space-y-0.5">
          <label htmlFor="isDefault" className='text-small font-medium cursor-pointer'>Set as Default</label>
          <p className="text-sm text-muted-foreground"> This account will be selected by default for transaction</p>
          </div>
          <Switch id='isDefault' onCheckedChange={(checked)=>setValue("isDefualt",checked)}
          checked={watch("isDefault")} />
         
        </div>

        <div className="flex gap-4 pt-4">
          <DrawerClose asChild>
            <Button type="button" variant="outline" className="flex-1">
              Cancel
            </Button>
          </DrawerClose>

          <Button type="submit" className="flex-1">
            Create Account
          </Button>
        </div>
      </form>
    </div>
  </DrawerContent>
</Drawer>
  )
}

export default CreateAccountDrawer
