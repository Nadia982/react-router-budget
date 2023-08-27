//react router dom imports
import { redirect } from "react-router-dom";

//helpers
import { deleteItem } from "../helpers";

//library
import { toast } from "react-toastify";

export async function logoutAction({}){
    //delete the user
    deleteItem({
        key: "userName",
    })
    toast.success(`You've deleted this user`)
    //return a redirect
    return redirect("/")
}