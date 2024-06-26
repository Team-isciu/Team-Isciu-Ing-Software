import React from "react";
import '../css/Copyright.css'
export default function Copyright() {  
    
    function getCurrentYear() 
    {
        return new Date().getFullYear();
    }
    var anno=getCurrentYear();
    return(
          
        <footer><div className="copyright"><p>Copyright &copy; {anno}-{anno+1} Team Isciu All Rights Reserved</p></div></footer>
    )
}