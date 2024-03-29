<script setup>
import { RouterLink } from 'vue-router'
import AuthLayout from '@/components/layouts/AuthLayout.vue'
import { useAuthStore } from '@/stores/auth'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { Loader2 } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form/index.js'
import { Separator } from '@/components/ui/separator/index.js'

const formSchema = toTypedSchema(
  z
    .object({
      first_name: z
        .string()
        .nonempty('First Name field is required')
        .min(3, 'Name must be at least 3 characters'),
      last_name: z
        .string()
        .nonempty('Last Name field is required')
        .min(3, 'Name must be at least 3 characters'),
      email: z
        .string()
        .nonempty('Email field is required')
        .email({ message: 'Must be a valid email' }),
      password: z.string().min(6, 'Password must be at least 6 characters'),
      password_confirmation: z.string().min(6, 'Confirm Password must be at least 6 characters')
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: 'Confirm passwords do not match',
      path: ['password_confirmation']
    })
)

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema
})

const authStore = useAuthStore()

const onSubmit = handleSubmit((values) => {
  authStore.handleRegister(values)
})
</script>

<template>
  <AuthLayout>
    <form @submit="onSubmit">
      <Card class="overflow-y-auto rounded">
        <CardHeader class="space-y-1">
          <CardTitle class="text-2xl font-semibold text-center">Create an account</CardTitle>
          <CardDescription class="text-center"
            >Enter your details to create an account</CardDescription
          >
          <Separator />
        </CardHeader>
        <CardContent class="grid gap-4 -mt-1.5">
          <FormField
            v-slot="{ componentField }"
            name="first_name"
            :validate-on-blur="!isFieldDirty"
          >
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter your first name" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="last_name" :validate-on-blur="!isFieldDirty">
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter your last name" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="email" :validate-on-blur="!isFieldDirty">
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter your email" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="password" :validate-on-blur="!isFieldDirty">
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter your password" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField
            v-slot="{ componentField }"
            name="password_confirmation"
            :validate-on-blur="!isFieldDirty"
          >
            <FormItem>
              <FormLabel>Password Confirmation</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your confirm password"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </CardContent>
        <CardFooter class="flex-col space-y-2">
          <Button v-if="!authStore.isLoading" class="w-full mb-2.5" type="submit">Register</Button>
          <Button v-else class="w-full mb-2.5" disabled>
            <Loader2 class="w-4 h-4 mr-2 animate-spin" />
            Please wait
          </Button>
          <Separator class="w-full" />
          <p class="pt-2">
            Don't have an account?
            <RouterLink
              to="/auth/login"
              class="border-b border-gray-500 text-muted-foreground hover:text-primary"
              >Login</RouterLink
            >
          </p>
        </CardFooter>
      </Card>
    </form>
  </AuthLayout>
</template>

<style scoped></style>
