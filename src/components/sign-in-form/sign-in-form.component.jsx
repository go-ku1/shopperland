import {useState} from "react";
import { createAuthUserWithEmailAndPassword,createUserDocumentFromAuth,signInWithGooglePopup,signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import "./sign-in-form.styles.scss"

const defaultFormFields={
    email:"",
    passord:"",
}
const SignInForm =()=>{
    const [formFields,setFormFields]=useState(defaultFormFields)
    const {email,password}=formFields

    console.log(formFields);

  

    const resetFormFields=()=>{
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle=async()=>{
        const {user}=await signInWithGooglePopup();
        

    };

    const handleSubmit=async(event)=>{
        event.preventDefault();
        
        try{
            const {user}=await signInAuthUserWithEmailAndPassword(email,password);
            
            resetFormFields();
        }

        catch(error){
            switch (error.code)
            {
                case "auth/wrong-password":
                    alert("incorrect password for the email");
                    break;

                case "auth/user-not-found":
                    alert("no user associated with these credentials");
                    break;

                default:
                    console.log("error");
            }
        }
    }
    

    const handleChange=(event)=>{
        const {name,value}=event.target;
        setFormFields({...formFields,[name]:value})
    };
    
    return(
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>SIGN IN WITH EMAIL AND PASSWORD</span>
            <form onSubmit={handleSubmit}>
                

                <FormInput label="Email"
                           inputOptions={{
                            type:"email", 
                            required:true,
                            onChange:handleChange,
                            name:"email",
                            value:email}}/>
                
                <FormInput label="Password"
                            inputOptions={{
                            type:"password", 
                            required:true,
                            onChange:handleChange,
                            name:"password",
                            value:password}}/>
                
                
                <div className="buttons-container">
                    <Button type="submit">SIGN IN</Button>
                    <Button type="button" buttonType="google" onClick={signInWithGoogle}>GOOGLE SIGN IN</Button>
                </div>
                
            </form>
        </div>
    )
}
export default SignInForm