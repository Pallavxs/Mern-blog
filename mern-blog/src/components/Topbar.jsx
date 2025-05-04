import React from "react";
import logo from "@/assets/images/logo-white.png";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineLogin } from "react-icons/md";
import { Button } from "./ui/button";
import SearchBox from "./SearchBox";
import { RouteBlogAdd, RouteIndex, RouteProfile, RouteSignIn } from "@/helpers/RouterName";
import { useSelector } from "react-redux";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaRegUser } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { showToast } from "@/helpers/showToast";
import { getEnv } from "@/helpers/getEnv";
import { removeUser } from "@/redux/user/user.slice";
import usericon from "@/assets/images/user.png";
import { IoMdSearch } from "react-icons/io";
import { useState } from "react";
import { MdOutlineMenu } from "react-icons/md";
import { useSidebar } from "./ui/sidebar";

const Topbar = () => {
  const { toggleSidebar } = useSidebar()
  const [showSearch, setShowSearch] = useState(false)
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/auth/logout`,
        {
          method: "Post",
          credentials: "include",
        }
      );

      const data = await response.json();
      if (!response.ok) {
        return showToast("error", data.message || "Something went wrong");
      }
      showToast("success", data.message);

      dispatch(removeUser());
      navigate(RouteIndex);
    } catch (error) {
      showToast("error", error.message || "Something went wrong");
    }
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch)
  }

  return (
    <div className='flex justify-between items-center h-16 fixed w-full z-20 bg-white px-5 border-b'>
    <div className='flex justify-center items-center gap-2'>
        <button onClick={toggleSidebar} className="md:hidden" type="button">
          <MdOutlineMenu />
        </button>
        <Link to={RouteIndex}>
            <img src={logo} className='md:w-auto w-48' />
        </Link>
    </div>
    <div className='w-[500px]'>
        <div className={`md:relative md:block absolute bg-white left-0 w-full md:top-0 top-16 md:p-0 p-5 ${showSearch ? 'block' : 'hidden'}`}>
            <SearchBox />
        </div>
    </div>
    <div className='flex items-center gap-5'>

        <button onClick={toggleSearch} type='button' className='md:hidden block'>
            <IoMdSearch size={25} />
        </button>
        {!user.isLoggedIn ? (
          <Button asChild className="rounded-full">
            <Link to={RouteSignIn} className="rounded-full">
              <MdOutlineLogin />
              Sign In
            </Link>
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
              <AvatarImage src={user.user?.avatar || usericon} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                <p>{user.user?.name}</p>
                <p className="text-sm">{user.user?.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to={RouteProfile}>
                  <FaRegUser />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={RouteBlogAdd}>
                  <FaPlus />
                  Create Blog
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={handleLogout}>
                <IoLogOutOutline color="red" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default Topbar;
