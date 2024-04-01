<script setup>
import { onBeforeMount } from 'vue'
import DashboardLayout from '@/components/layouts/DashboardLayout.vue'
import { useBrandStore } from '@/stores/brand.js'
import { Plus, EllipsisVertical, SquarePen, Trash2 } from 'lucide-vue-next'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb/index.js'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import Badge from '@/components/ui/badge/Badge.vue'
const brand = useBrandStore()
onBeforeMount(async () => {
  await brand.getBrands()
})
</script>

<template>
  <DashboardLayout>
    <div class="py-2">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/dashboard"> Dashboard </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Brands</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
    <div
      class="bg-white rounded-md border border-gray-100 p-4 dark:bg-gray-950 dark:border-gray-900"
    >
      <div class="flex items-center justify-between py-2">
        <div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-200">Brands</h3>
        </div>
        <div>
          <RouterLink
            to="/admin/brands/create"
            class="flex items-center px-2.5 py-1.5 bg-primary text-white rounded-md dark:bg-gray-800 dark:border-gray-300 dark:text-gray-300"
          >
            <Plus class="h-5 w-5 mr-1" />Add
          </RouterLink>
        </div>
      </div>
      <Table>
        <TableCaption v-if="brand.brands.length < '1'"
          >No record found. Please create a brand.</TableCaption
        >
        <TableHeader>
          <TableRow>
            <TableHead class="w-[50px]"> S.N </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="item in brand.brands" :key="item.id">
            <TableCell>
              {{ item.id }}
            </TableCell>
            <TableCell class="font-medium">
              {{ item.name }}
            </TableCell>
            <TableCell>
              {{ item.description }}
            </TableCell>
            <TableCell>
              <Avatar>
                <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell>
              <Badge v-if="item.status == '1'" :variant="primary"> Active </Badge>
              <Badge v-else :variant="destructive"> Inactive </Badge>
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <EllipsisVertical class="h-5 w-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <RouterLink
                      :to="{ name: 'brand-edit', params: { id: item.id } }"
                      class="flex items-center"
                    >
                      <SquarePen class="h-4 w-4 mr-1.5" />
                      Edit
                    </RouterLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem @click="brand.handleDestroyBrand(item.id)">
                    <Trash2 class="h-4 w-4 mr-1.5" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </DashboardLayout>
</template>

<style scoped></style>
