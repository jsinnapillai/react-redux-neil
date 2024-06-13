import { FormGroup, FormControlLabel, Checkbox } from '@mui/material'
import React, { useState } from 'react'


interface Props {
    items : string[];
    checked?:string[];
    onChange:(items:string[]) => void;
}


const CheckBoxButtons = ({items,checked,onChange}: Props) => {
const [checkItems, setCheckItems] = useState(checked || []);

const handleChecked = (value:string) => {
    const curIndex = checkItems.findIndex(item => item === value);
    let newChecked : string[] =[];
    if (curIndex === -1) 
        {
            newChecked = [...checkItems,value];
        }
    else
    {
        newChecked = checkItems.filter(item => item !== value)
    }
    setCheckItems(newChecked);
    onChange(newChecked);


}


  return (
            
    <FormGroup>
    {items.map((brand) => (
      <FormControlLabel
        control={
        <Checkbox  checked={checkItems.indexOf(brand) !== -1} onClick={() => handleChecked(brand)} />
    }
        label={brand}
        key={brand}
      />
    ))}
  </FormGroup>
  )
}

export default CheckBoxButtons