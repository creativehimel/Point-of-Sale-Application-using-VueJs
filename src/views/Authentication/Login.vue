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
  z.object({
    email: z
      .string()
      .nonempty('Email field is required')
      .email({ message: 'Must be a valid email' }),
    password: z
      .string()
      .nonempty('Password field is required')
      .min(6, 'Password must be at least 6 characters')
  })
)

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema
})

const authStore = useAuthStore()
const onSubmit = handleSubmit((values) => {
  authStore.handleLogin(values)
})
</script>

<template>
  <AuthLayout>
    <form @submit="onSubmit">
      <Card class="overflow-y-auto rounded">
        <CardHeader class="space-y-1">
          <CardTitle class="text-2xl font-bold text-center">Welcome Back</CardTitle>
          <CardDescription class="text-center"
            >Enter Your Credentials to access your account</CardDescription
          >
          <Separator />
        </CardHeader>
        <CardContent class="grid gap-4 -mt-2">
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
              <div class="flex justify-between items-center">
                <FormLabel>Password</FormLabel>
                <p>
                  <RouterLink
                    to="/auth/forget-password"
                    class="border-b border-gray-500 text-muted-foreground hover:text-primary"
                    >Forgot Password?</RouterLink
                  >
                </p>
              </div>
              <FormControl>
                <Input type="password" placeholder="Enter your name" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </CardContent>
        <CardFooter class="flex-col space-y-2">
          <Button v-if="!authStore.isLoading" class="w-full mb-2.5" type="submit">Login</Button>
          <Button v-else class="w-full mb-2.5" disabled>
            <Loader2 class="w-4 h-4 mr-2 animate-spin" />
            Please wait
          </Button>
          <Separator class="w-full" />
          <p class="pt-2.5">
            Already have an account?
            <RouterLink
              to="/auth/register"
              class="border-b border-gray-500 text-muted-foreground hover:text-primary"
              >Register</RouterLink
            >
          </p>
        </CardFooter>
      </Card>
    </form>
  </AuthLayout>
</template>

<style scoped></style>
