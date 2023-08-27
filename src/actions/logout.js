//react router dom imports
import { redirect } from "react-router-dom";

//helpers
import { deleteItem } from "../helpers";

export async function logoutAction(){
    //delete the user
    deleteItem({
        key: "userName",
    })

    //return a redirect
    return redirect("/")
}