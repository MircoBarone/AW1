import { useState } from "react";
function Button(props) {
let [buttonLang, setButtonLang] = useState(props.lang) ;
if (buttonLang ===
'it')
return <button onClick={()=>setButtonLang('en')}>Ciao!</button>;
else
return <button onClick={()=>setButtonLang('it')}>Hello!</button>;
}
export default Button
//L'ultima riga serve per esportare il componente, deve seguire un import nel file principale.
//Ho delle callback che in caso di click mi setta lo stato ad italiano o inglese alternativamente.
