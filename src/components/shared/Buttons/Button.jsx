import React from 'react';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import RegisterIcon from '@mui/icons-material/HowToReg';
import EditIcon from '@mui/icons-material/Edit';
import HomeIcon from '@mui/icons-material/Home';
import SaveIcon from '@mui/icons-material/Save';
import { Link } from 'react-router-dom';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import DeleteIcon from '@mui/icons-material/Delete';

const CustomButton = ({ type, onClick, disabled }) => {
  const renderButton = () => {
    switch (type) {
      case 'login':
        return (
          <Button 
            type='submit'
            variant="contained" 
            color="primary"
            sx={{ mr: 1 }} 
            startIcon={<LoginIcon />} 
            onClick={onClick}
          >
            Login
          </Button>
        );
      case 'register':
        return (
          <Button 
            type='submit'
            variant="contained" 
            sx={{ mr: 1 }}
            color= "secondary" 
            startIcon={<RegisterIcon />} 
            onClick={onClick}
          >
            Register
          </Button>
        );
      case 'edit':
        return (
          <Button 
          size='small'
            color='secondary'
            sx={{ mt: 3, mb: 2 }}
            startIcon={<EditIcon />} 
            onClick={onClick}
          >
           
          </Button>
        );
        case 'save':
          return (
            <Button
            type='submit'
            color='success'
            variant= 'contained'
            sx={{mr: 3 , mb: 2}}
            startIcon = {<SaveIcon />}
            onClick={onClick}
            >
              Save Changes
            </Button>
          )
        case 'home':
        return(
          <Button
          sx={{marginLeft: "100px" , fontSize: 18, marginTop:"-66px", fontWeight: 'bold'}}
          variant='text'
          component = {Link}
          to= '/'
          color='inherit'
          >
            Shopify
          </Button>
        )
        case 'search':
          return(
            <Button
            variant='text'
            onClick={onClick}
            type='submit'
            color='primary'
            startIcon= {<SearchRoundedIcon />}
            sx={{marginLeft: 1}}
            >
            </Button>
          )
          case 'add' :
            return(
              <Button
              size='small'
              onClick={onClick}
              sx={{ boxShadow: "0px 0px 20px rgba(0,0,0,0.5)" ,bgcolor: 'grey', fontSize: 15,
                "&:disabled" : {
                  cursor:"not-allowed",
                  bgcolor:"grey"
                },
              }}
              variant='contained'
              disabled= {disabled}
              >
                +
              </Button>
            )
            case 'sub' :
              return(
                <Button
                size='small'
                onClick={onClick}
                sx={{ boxShadow: "0px 0px 20px rgba(0,0,0,0.5)", bgcolor: 'grey', fontSize: 15}}
                variant='contained'
                >
                  -
                </Button>
              )
              case 'delete' :
                return (
                  <Button
                  size='large'
                  sx={{color: "grey"}}
                  onClick={onClick}
                  startIcon= {<DeleteIcon />}
                  variant='text'
                  >
                    
                  </Button>
                )
      default:
        return (
          <Button 
            variant="contained" 
            onClick={onClick}
          >
            Default
          </Button>
        );
    }
  };

  return (
    <div>
      {renderButton()}
    </div>
  );
};

export default CustomButton;
