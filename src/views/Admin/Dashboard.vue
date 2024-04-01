<script setup>
import DashboardLayout from '@/components/layouts/DashboardLayout.vue'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList
} from '@/components/ui/breadcrumb/index.js'
</script>

<template>
  <DashboardLayout>
    <div class="py-2">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/dashboard"> Dashboard </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <div
        class="bg-white rounded-md border border-gray-100 px-3 py-6 hover:shadow cursor-pointer transition duration-200 ease-in-out outline-none focus:outline-none"
      >
        <div class="flex items-center gap-8">
          <div>
            <img src="https://dummyimage.com/50x50" alt="" />
          </div>
          <div>
            <div class="text-sm font-medium text-gray-900">Total Users</div>
            <div class="text-3xl font-bold text-gray-900">5</div>
          </div>
        </div>
      </div>
      <div
        class="bg-white rounded-md border border-gray-100 px-3 py-6 hover:shadow cursor-pointer transition duration-200 ease-in-out outline-none focus:outline-none"
      >
        <div class="flex items-center gap-4">
          <div>
            <img src="https://dummyimage.com/50x50" alt="" />
          </div>
          <div>
            <div class="text-sm font-medium text-gray-900">Total Sales</div>
            <div class="text-3xl font-bold text-gray-900">5</div>
          </div>
        </div>
      </div>
      <div
        class="bg-white rounded-md border border-gray-100 px-3 py-6 hover:shadow cursor-pointer transition duration-200 ease-in-out outline-none focus:outline-none"
      >
        <div class="flex items-center gap-4">
          <div>
            <img src="https://dummyimage.com/50x50" alt="" />
          </div>
          <div>
            <div class="text-sm font-medium text-gray-900">Total Sale Return</div>
            <div class="text-3xl font-bold text-gray-900">5</div>
          </div>
        </div>
      </div>
      <div
        class="bg-white rounded-md border border-gray-100 px-3 py-6 hover:shadow cursor-pointer transition duration-200 ease-in-out outline-none focus:outline-none"
      >
        <div class="flex items-center gap-4">
          <div>
            <img src="https://dummyimage.com/50x50" alt="" />
          </div>
          <div>
            <div class="text-sm font-medium text-gray-900">Total Purchase</div>
            <div class="text-3xl font-bold text-gray-900">5</div>
          </div>
        </div>
      </div>
      <div
        class="bg-white rounded-md border border-gray-100 px-3 py-6 hover:shadow cursor-pointer transition duration-200 ease-in-out outline-none focus:outline-none"
      >
        <div class="flex items-center gap-4">
          <div>
            <img src="https://dummyimage.com/50x50" alt="" />
          </div>
          <div>
            <div class="text-sm font-medium text-gray-900">Total Purchase Due</div>
            <div class="text-3xl font-bold text-gray-900">5</div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<style scoped></style>
