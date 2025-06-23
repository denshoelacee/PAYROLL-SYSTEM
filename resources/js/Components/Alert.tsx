import { Alert } from "@mui/material"

/**
 * 
 * @param success - receive success message from parent
 * @param info -  receive information message from parent
 * @param error - receive error message from parent
 * @param warning - receive warning message from parent
 * @returns -  returns alert message via component
 */
export function SuccessMessage({success,className}:{success:string,className?:string}){

    return (
        <>
            <Alert className={className} severity="success"
                    sx={{ backgroundColor: 'rgba(209, 250, 229, 0.1)',
                    color: '#66bb6a',
                    fontWeight: 400,
                    fontFamily: 'Roboto, Helvetica, Arial, sans-serif'                               
            }}>{success}</Alert>
        </>
    )
}

export function ErrorMessage({error,className}:{error:string, className?:string}){
    return (
        <>
            <Alert className={className} severity="error"
                    sx={{ backgroundColor: 'rgb(244, 199, 199)',
                    color: '#f44336',
                    fontWeight: 400,
                    fontFamily: 'Roboto, Helvetica, Arial, sans-serif'                     
            }}>{error}</Alert>
        </>
    )
}

export function InfoMessage({info,className}:{info:string, className?:string}){
    return (
        <>
            <Alert className={className} severity="info"
                    sx={{ backgroundColor: 'rgb(184, 231, 251)',
                    color: '#29b6f6',
                    fontWeight: 400,
                    fontFamily: 'Roboto, Helvetica, Arial, sans-serif'                     
            }}>{info}</Alert>
        </>
    )
}