<script setup>
import { useAuthStore } from '@/stores/auth'
import { useColorMode } from '@vueuse/core'
import sidebarMenus from '@/data/sidebarMenu.js'
import {
  ArrowRight,
  Bell,
  CircleUser,
  Home,
  Menu,
  Package2,
  Search,
  Sun,
  Moon
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { RouterLink } from 'vue-router'
const mode = useColorMode()
const authStore = useAuthStore()
// const isOpen = ref(false)
</script>

<template>
  <div class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
    <div class="hidden border-r bg-muted/40 md:block">
      <div class="flex h-full max-h-screen flex-col gap-2">
        <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <a href="/" class="flex items-center gap-2 font-semibold">
            <Package2 class="h-6 w-6" />
            <span class="">Pos App</span>
          </a>
          <Button variant="outline" size="icon" class="ml-auto h-8 w-8">
            <Bell class="h-4 w-4" />
            <span class="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div class="flex-1">
          <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
            <ul>
              <li>
                <RouterLink
                  to="/admin/dashboard"
                  class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <Home class="h-5 w-5" />
                  Dashboard
                </RouterLink>
              </li>
              <li
                v-for="menuList in sidebarMenus"
                :key="menuList.id"
                class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Collapsible v-model:open="isOpen">
                  <CollapsibleTrigger class="flex items-center gap-3">
                    <component :is="menuList.icon" class="h-5 w-5" />
                    <span class="text-md">{{ menuList.name }}</span>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <ul class="mt-2">
                      <li
                        v-for="menu in menuList.children"
                        :key="menu.id"
                        class="text-sm flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                      >
                        <RouterLink :to="menu.link" class="flex items-center gap-2">
                          <ArrowRight class="h-4 w-4" />
                          {{ menu.name }}
                        </RouterLink>
                      </li>
                    </ul>
                  </CollapsibleContent>
                </Collapsible>
              </li>
            </ul>
          </nav>
        </div>
        <div class="mt-auto p-4"></div>
      </div>
    </div>
    <div class="flex flex-col">
      <header class="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
        <Sheet>
          <SheetTrigger as-child>
            <Button variant="outline" size="icon" class="shrink-0 md:hidden">
              <Menu class="h-5 w-5" />
              <span class="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" class="flex flex-col">
            <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
              <a href="#" class="flex items-center gap-2 text-lg font-semibold">
                <Package2 class="h-6 w-6" />
                <span class="sr-only">Acme Inc</span>
              </a>
              <ul class="mt-4">
                <li>
                  <RouterLink
                    to=""
                    class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    <Home class="h-4 w-4" />
                    Dashboard
                  </RouterLink>
                </li>
                <li
                  v-for="menuList in sidebarMenus"
                  :key="menuList.id"
                  class="mx-[-0.65rem] flex items-center gap-4 rounded-xl hover:bg-muted px-3 py-2 text-foreground hover:text-foreground"
                >
                  <Collapsible v-model:open="isOpen">
                    <CollapsibleTrigger class="flex items-center gap-3">
                      <component :is="menuList.icon" class="h-5 w-5" />
                      <span class="text-md">{{ menuList.name }}</span>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <ul class="mt-2">
                        <li
                          v-for="menu in menuList.children"
                          :key="menu.id"
                          class="mx-[-0.65rem] flex items-center gap-4 rounded-xl hover:bg-muted px-3 py-2 text-foreground hover:text-foreground"
                        >
                          <RouterLink to="menuList.link" class="flex items-center gap-2">
                            <ArrowRight class="h-4 w-4" />
                            {{ menu.name }}
                          </RouterLink>
                        </li>
                      </ul>
                    </CollapsibleContent>
                  </Collapsible>
                </li>
              </ul>
            </nav>

            <div class="mt-auto"></div>
          </SheetContent>
        </Sheet>
        <div class="w-full flex-1">
          <form>
            <div class="relative">
              <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                class="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
              />
            </div>
          </form>
        </div>
        <div class="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="link" size="icon">
                <Moon
                  class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                />
                <Sun
                  class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                />
                <span class="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem @click="mode = 'light'"> Light </DropdownMenuItem>
              <DropdownMenuItem @click="mode = 'dark'"> Dark </DropdownMenuItem>
              <DropdownMenuItem @click="mode = 'auto'"> System </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="secondary" size="icon" class="rounded-full">
                <CircleUser class="h-5 w-5" />
                <span class="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button @click="authStore.handleLogout">Logout</Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-gray-50/65 dark:bg-slate-900">
        <slot />
      </main>
    </div>
  </div>
</template>
