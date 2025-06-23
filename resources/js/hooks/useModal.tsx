import { useState } from 'react';

/**REUSABLE COMPONENT BASED ON PARENTS BUTTON ACTIONS
 * @isOpen - a value holder from parent, boolean type. 
 * @open - open set to true 
 * @close - close set to false 
 * @returns - returns value true or false, if button is click to open specific modal,drawers,etc..
 */
export default function useModal() {
    const [isOpen, setIsOpen] = useState(false);
    const open = setIsOpen(true);
    const close = setIsOpen(false);


    return {
        isOpen,
        open,
        close,
    };

}