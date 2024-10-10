"use client"

import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect,useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,

} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { useExitModel } from "@/app/store/use-exit-model"

 export const ExitModal =() =>{
   const router =useRouter();
   const [isClient,setIsClient] =useState(false);
   const {isOpen,close} = useExitModel();useEffect(()=> setIsClient(true),[]);

   if(!isClient){
    return null;
   }

   return(

    <Dialog open={isOpen} onOpenChange={close}>
        <DialogContent className="max-w-md">
           
            <DialogHeader>
                <div className="flex items-center w-full justify-center mb-5">
                    <Image src ="/mascot_sad.svg" alt="Mascot" height ={80} width={80} ></Image>
                </div>
                <DialogTitle className="text-center font-bold text-2xl"> Don't leave</DialogTitle>
                <DialogDescription>
                    You are about to leave the lesson are you,sure
                </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mb-4">
             <Button variant="primary" className="w-full" size="lg" onClick ={close} >Keep learning</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
   )
 };