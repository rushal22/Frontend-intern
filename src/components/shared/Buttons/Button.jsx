import React from 'react';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import RegisterIcon from '@mui/icons-material/HowToReg';
import EditIcon from '@mui/icons-material/Edit';
import HomeIcon from '@mui/icons-material/Home';
import SaveIcon from '@mui/icons-material/Save';
import { Link } from 'react-router-dom';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';


const CustomButton = ({ type, onClick }) => {
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
            variant="contained"
            color='secondary'
            sx={{ mt: 3, mb: 2 }}
            startIcon={<EditIcon />} 
            onClick={onClick}
          >
            Edit Profile
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
          variant='text'
          component = {Link}
          to= '/'
          color='inherit'
          startIcon={<HomeIcon />}
          >
            Genius
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
              sx={{bgcolor: 'grey'}}
              variant='contained'
              >
                +
              </Button>
            )
            case 'sub' :
              return(
                <Button
                size='small'
                onClick={onClick}
                sx={{bgcolor: 'grey'}}
                variant='contained'
                >
                  -
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
