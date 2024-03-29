import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'

export default function BasicMenu() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <div className="md:!hidden">
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                className="!capitalize !text-white !font-sans"
            >
                Browse
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                className="menu"
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem className='!font-sans' onClick={handleClose}>Home</MenuItem>
                <MenuItem className='!font-sans' onClick={handleClose}>TV Shows</MenuItem>
                <MenuItem className='!font-sans' onClick={handleClose}>Movies</MenuItem>
                <MenuItem className='!font-sans' onClick={handleClose}>New & Popular</MenuItem>
                <MenuItem className='!font-sans' onClick={handleClose}>My List</MenuItem>
            </Menu>
        </div>
    )
}