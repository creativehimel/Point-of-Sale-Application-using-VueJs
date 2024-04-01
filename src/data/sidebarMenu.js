import { NotebookTabs, BadgePlus, BadgeMinus, Boxes } from 'lucide-vue-next'

const sidebarMenus = [
  {
    id: 1,
    name: 'Contacts',
    icon: NotebookTabs,
    children: [
      {
        id: 1,
        name: 'Customers',
        link: '/admin/customers'
      },
      {
        id: 2,
        name: 'Suppliers',
        link: '/admin/suppliers'
      }
    ]
  },
  {
    id: 2,
    name: 'Products',
    icon: Boxes,
    children: [
      {
        id: 1,
        name: 'List Products',
        link: '/admin/products'
      },
      {
        id: 2,
        name: 'Add Product',
        link: '/admin/products/create'
      },
      {
        id: 3,
        name: 'List Categories',
        link: '/admin/categories'
      },
      {
        id: 4,
        name: 'Brands',
        link: '/admin/brands'
      },
      {
        id: 5,
        name: 'Units',
        link: '/admin/units'
      }
    ]
  },
  {
    id: 3,
    name: 'Purchases',
    icon: BadgePlus,
    children: [
      {
        id: 1,
        name: 'List Purchases',
        link: '/admin/purchases'
      },
      {
        id: 2,
        name: 'Add Purchase',
        link: '/admin/purchases/create'
      },
      {
        id: 3,
        name: 'List Purchase Return',
        link: '/admin/purchases/return'
      }
    ]
  },
  {
    id: 4,
    name: 'Sales',
    icon: BadgeMinus,
    children: [
      {
        id: 1,
        name: 'List Sales',
        link: '/admin/sales'
      },
      {
        id: 2,
        name: 'Add Sale',
        link: '/admin/sales/create'
      },
      {
        id: 3,
        name: 'List Sale Return',
        link: '/admin/sales/return'
      }
    ]
  }
]

export default sidebarMenus
