<script setup>
import { useBrandStore } from '@/stores/brand.js'
import DashboardLayout from '@/components/layouts/DashboardLayout.vue'
import { RouterLink } from 'vue-router'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { Loader2, ArrowLeft } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb/index.js'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form/index.js'
import { Separator } from '@/components/ui/separator/index.js'
const MAX_FILE_SIZE = 5000000
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const formSchema = toTypedSchema(
  z.object({
    name: z
      .string()
      .nonempty('Brand name field is required')
      .min(3, { message: 'Brand name must be at least 6 characters' }),
    status: z.enum(['1', '0']),
    description: z.string().optional(),
    image: z
      .any()
      .optional()
      .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        'Only .jpg, .jpeg, .png and .webp formats are supported.'
      )
  })
)
const brand = useBrandStore()

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema
})

const onSubmit = handleSubmit((values) => {
  //console.log(values)
  brand.handleStoreBrand(values)
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
            <BreadcrumbLink href="/admin/brands"> Brands </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Create</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
    <div>
      <form @submit="onSubmit" enctype="multipart/form-data">
        <Card class="overflow-y-auto rounded">
          <CardHeader class="space-y-1">
            <CardTitle class="text-2xl font-bold text-center">
              <div class="flex items-center justify-between py-2">
                <div>
                  <h3 class="text-lg font-medium text-gray-900 dark:text-gray-200">Create Brand</h3>
                </div>
                <div>
                  <RouterLink
                    to="/admin/brands"
                    class="flex items-center px-2.5 py-1.5 bg-primary text-white rounded-md dark:bg-gray-800 dark:border-gray-300 dark:text-gray-300 text-sm"
                  >
                    <ArrowLeft class="h-4 w-4 mr-1" />
                    Back
                  </RouterLink>
                </div>
              </div>
            </CardTitle>
            <Separator />
          </CardHeader>
          <CardContent class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 -mt-2">
            <FormField v-slot="{ componentField }" name="name" :validate-on-blur="!isFieldDirty">
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter your brand name" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="status" :validate-on-blur="!isFieldDirty">
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Select v-bind="componentField">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="1"> Active </SelectItem>
                        <SelectItem value="0"> Inactive </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <div class="md:col-span-2">
              <FormField
                v-slot="{ componentField }"
                name="description"
                :validate-on-blur="!isFieldDirty"
              >
                <FormItem>
                  <FormLabel>Description:</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter your brand description" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>
            <div class="md:col-span-2">
              <FormField v-slot="{ componentField }" name="image" :validate-on-blur="!isFieldDirty">
                <FormItem>
                  <FormLabel>Image:</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      placeholder="Enter your brand description"
                      v-bind="componentField"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>
          </CardContent>
          <CardFooter class="flex-col space-y-2">
            <Button v-if="!brand.isLoading" class="w-full mb-2.5" type="submit">Create</Button>
            <Button v-else class="w-full mb-2.5" disabled>
              <Loader2 class="w-4 h-4 mr-2 animate-spin" />
              Please wait
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  </DashboardLayout>
</template>

<style scoped></style>
