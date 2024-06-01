import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, ListItemText, Typography } from '@mui/material'
import agent from '../../api/agent'
import { useState } from 'react'

const About = () => {

  const [validationErrors,setValidationErrors] = useState<string[]>([]);

const getValidationErrors = () => { 

  agent.TestErrors.getValidationError()
  .then(() => console.log("You should not see this"))
  .catch((error) => setValidationErrors(error) )

}

  return (
    <Container>
      <Typography gutterBottom variant='h2'> Error for testing purpose</Typography>
      <ButtonGroup fullWidth>
      <Button variant="contained" onClick={() => agent.TestErrors.get400Error().catch(error => console.log(error))}>  Bad Request Error</Button>
      <Button variant="contained" onClick={() => agent.TestErrors.get401Error().catch(error => console.log(error))}  > Test 401 Un Authorized Error</Button>
      <Button variant="contained" onClick={() => agent.TestErrors.get404Error().catch(error => console.log(error))}  > Test 404 Not Found Error</Button>
      <Button variant="contained" onClick={() => agent.TestErrors.get500Error().catch(error => console.log(error))} > Test 500 Server Error</Button>
      <Button variant="contained" onClick={getValidationErrors} > Test Validation Error</Button>
      

      </ButtonGroup>
      {validationErrors.length >0 && 
      <Alert severity='error'>
        <AlertTitle> Validation Errors</AlertTitle> 
        <List>
        {validationErrors.map((error) => (
          <ListItem key={error}
           >
              <ListItemText>{error} </ListItemText>

           </ListItem>
        ))}
        </List>
      </Alert>
      }
    </Container>
  )
}

export default About