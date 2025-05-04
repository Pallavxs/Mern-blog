import { Link } from "react-router-dom";
import logo from "@/assets/images/logo-white.png";
import { IoHomeOutline } from "react-icons/io5";
import { TbCategory } from "react-icons/tb";
import { FaBlog } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { GoDot } from "react-icons/go";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { RouteBlog, RouteBlogByCategory, RouteCategoryDetails, RouteCommentDetail, RouteIndex, RouteUser } from "@/helpers/RouterName";
import { useFetch } from "@/hooks/useFetch";
import { getEnv } from "@/helpers/getEnv";
import { useSelector } from "react-redux";

export function AppSidebar() {
  const user = useSelector(state => state.user)
  const { data: categoryData } = useFetch(`${getEnv("VITE_API_BASE_URL")}/category/all-category`,
    {
      method: "get",
      credentials: "include",
    }
  );

  return (
    <Sidebar>
      <SidebarHeader className="bg-white">
        <img src={logo} width={120} />
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>

                <SidebarMenuItem>
                  <div className="flex items-center gap-2">
                    <IoHomeOutline size={20} />
                    <Link to={RouteIndex}>Home</Link>
                  </div>
                </SidebarMenuItem>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {user && user.isLoggedIn 
            ?
            <>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <SidebarMenuItem>
                  <div className="flex items-center gap-2">
                    <FaBlog size={20} />
                    <Link to={RouteBlog}>Blogs</Link>
                  </div>
                </SidebarMenuItem>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton>
                <SidebarMenuItem>
                  <div className="flex items-center gap-2">
                    <FaRegCommentDots size={20} />
                    <Link to={RouteCommentDetail}>Comments</Link>
                  </div>
                </SidebarMenuItem>
              </SidebarMenuButton>
            </SidebarMenuItem>
            </>
            :
            <>
            </>
            }

            {user && user.isLoggedIn && user.user.role === 'admin'
            ?
            <>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <SidebarMenuItem>
                  <div className="flex items-center gap-2">
                    <TbCategory size={20} />
                    <Link to={RouteCategoryDetails}>categories</Link>
                  </div>
                </SidebarMenuItem>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton>
                <SidebarMenuItem>
                  <div className="flex items-center gap-2">
                    <FaUsers size={20} />
                    <Link to={RouteUser}>Users</Link>
                  </div>
                </SidebarMenuItem>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            </>
            :
            <>
            </>
            }

          </SidebarMenu>
        </SidebarGroup>


        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarMenu>
            {categoryData &&
              categoryData.category.length > 0 &&
              categoryData.category.map((category) => {
                return (
                  <SidebarMenuItem key={category._id}>
                    <SidebarMenuButton>
                      <div className="flex items-center gap-2">
                        <GoDot size={20} />
                        <Link to={RouteBlogByCategory(category.slug)}>{category.name}</Link>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
