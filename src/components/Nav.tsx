import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem, NavigationMenuLink,
  NavigationMenuTrigger
} from "~/components/ui/navigation-menu";

export default function Nav() {
  return (
    <NavigationMenu class="p-4">
      <NavigationMenuItem>
        <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
        <NavigationMenuContent>
          <NavigationMenuLink>Link</NavigationMenuLink>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Item Two</NavigationMenuTrigger>
        <NavigationMenuContent>
          <NavigationMenuLink>Link</NavigationMenuLink>
          <NavigationMenuLink>Link</NavigationMenuLink>
          <NavigationMenuLink>Link</NavigationMenuLink>
          <NavigationMenuLink>Link</NavigationMenuLink>
          <NavigationMenuLink>Link</NavigationMenuLink>
          <NavigationMenuLink>Link</NavigationMenuLink>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Item TwThro</NavigationMenuTrigger>
        <NavigationMenuContent>
          <NavigationMenuLink>Link</NavigationMenuLink>
          <NavigationMenuLink>Link</NavigationMenuLink>
          <NavigationMenuLink>Link</NavigationMenuLink>
          <NavigationMenuLink>Link</NavigationMenuLink>
          <NavigationMenuLink>Link</NavigationMenuLink>
          <NavigationMenuLink>Link</NavigationMenuLink>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenu>

  );
}
