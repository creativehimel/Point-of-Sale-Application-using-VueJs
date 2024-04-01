<script setup>
import { onBeforeMount } from 'vue'
import DashboardLayout from '@/components/layouts/DashboardLayout.vue'
import { useBrandStore } from '@/stores/brand.js'
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
    <div class="bg-white rounded-md border border-gray-100 p-4">
      <Table>
        <TableCaption v-if="brand.brands.length < '1'"
          >No record found. Please create a brand.</TableCaption
        >
        <TableHeader>
          <TableRow>
            <TableHead class="w-[100px]"> S.N </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Status</TableHead>
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
              <Badge v-if="item.status == '1'" variant="success"> Active </Badge>
              <Badge v-else variant="success"> Inactive </Badge>
            </TableCell>
            <TableCell>
              <Badge v-if="item.status == '1'" variant="success"> Active </Badge>
              <Badge v-else variant="success"> Inactive </Badge>

              <!-- {{ item.status }} -->
            </TableCell>
            <!-- <TableCell>{{ invoice.paymentStatus }}</TableCell>
            <TableCell>{{ invoice.paymentMethod }}</TableCell>
            <TableCell class="text-right">
              {{ invoice.totalAmount }}
            </TableCell> -->
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </DashboardLayout>
</template>

<style scoped></style>
