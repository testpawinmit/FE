export const menus = [
  {
    'name': 'Dashboard',
    'icon': 'dashboard',
    'link': '/auth/dashboard',
    'open': true,
    'chip': false
  },
  {
    'name': 'Customer Profile',
    'icon': 'account_circle',
    'link': '/auth/customer-profile',
    'open': true,
    'chip': { 'value': 2, 'color': 'accent' }
    /*'sub': [
        {
            'name': 'Customer',
            'link': '/auth/customer-profile',
            'icon': 'perm_identity',
            'chip': false,
            'open': true,
        },
        {
            'name': 'Pet',
            'link': '/auth/pet-profile',
            'icon': 'pets',
            'chip': false,
            'open': true,
        }
    ]*/
  },
  /*{
      'name': 'Appointments',
      'icon': 'assignment_turned_in',
      'link': '/auth/appoinment',
      'open': true,
      'chip': { 'value': 2, 'color': 'accent' },
  },*/
  /*{
      'name': 'Products',
      'icon': 'shop_two',
      'link': false,
      'open': false,
      'chip': { 'value': 2, 'color': 'accent' },
      'sub': [
          {
              'name': 'Retail',
              'link': '/auth/retail.ts',
              'icon': 'shopping_cart',
              'chip': false,
              'open': true,
          },
          {
              'name': 'Stock',
              'link': '/auth/suppliers',
              'icon': 'supervised_user_circle',
              'chip': false,
              'open': true,
          }
      ]
  },*/
  {
    'name': 'Stock',
    'link': '/auth/suppliers',
    'icon': 'supervised_user_circle',
    'chip': false,
    'open': true
  },
  {
    'name': 'Veterinary',
    'icon': 'perm_identity',
    'link': '/auth/veterinary',
    'open': true,
    'chip': { 'value': 2, 'color': 'accent' }
  },
  {
    'name': 'Company Portal',
    'icon': 'chrome_reader_mode',
    'link': '/auth/company-portal',
    'open': true,
    'chip': { 'value': 2, 'color': 'accent' }
  },
  {
    'name': 'Pet Live Board',
    'icon': 'important_devices',
    'link': '/auth/pet-live-board',
    'open': true,
    'chip': { 'value': 2, 'color': 'accent' }
  },
  {
    'name': 'Service Dogs',
    'icon': 'transfer_within_a_station',
    'link': '/auth/service-dogs',
    'open': true,
    'chip': { 'value': 2, 'color': 'accent' }
  },
  {
    'name': 'Employees',
    'icon': 'person',
    'link': false,
    'open': false,
    'chip': { 'value': 2, 'color': 'accent' },
    'sub': [
      {
        'name': 'Add Employee',
        'link': '/auth/add-employee',
        'icon': 'person_add',
        'chip': false,
        'open': true
      },
      {
        'name': 'Employee Schedule',
        'link': '/auth/employee-schedule',
        'icon': 'schedule',
        'chip': false,
        'open': true
      }
    ]
  },
  {
    'name': 'Administrator',
    'icon': 'settings_input_svideo',
    'link': false,
    'open': false,
    'chip': { 'value': 3, 'color': 'accent' },
    'sub': [
      {
        'name': 'Resources',
        'link': '/auth/resources',
        'icon': 'meeting_room',
        'chip': false,
        'open': true
      },
      {
        'name': 'Breed',
        'link': '/auth/breed',
        'icon': 'casino',
        'chip': false,
        'open': true
      },
      {
        'name': 'Color',
        'link': '/auth/color',
        'icon': 'color_lens',
        'chip': false,
        'open': true
      },
      {
        'name': 'Service',
        'link': '/auth/service',
        'icon': 'color_lens',
        'chip': false,
        'open': true
      }
    ]
  },
  {
    'name': 'Reports',
    'icon': 'report',
    'link': false,
    'open': false,
    'chip': { 'value': 6, 'color': 'accent' },
    'sub': [
      {
        'name': 'Feeding',
        'link': '/auth/feeding-report',
        'icon': ' fastfood',
        'chip': false,
        'open': true
      },
      {
        'name': 'Medication',
        'link': '/auth/medication-report',
        'icon': 'local_hospital',
        'chip': false,
        'open': true
      },
      {
        'name': 'Revenue',
        'link': '/auth/revenue-report',
        'icon': 'attach_money',
        'chip': false,
        'open': true
      },
      {
        'name': 'Check In',
        'link': '/auth/checkin-report',
        'icon': 'assignment_turned_in',
        'chip': false,
        'open': true
      },
      {
        'name': 'Check Out',
        'link': '/auth/checkout-report',
        'icon': 'assignment_late',
        'chip': false,
        'open': true
      },
      {
        'name': 'List of Service Dogs',
        'link': '/auth/list-of-service-dogs',
        'icon': 'pets',
        'chip': false,
        'open': true
      },
      /*{
        'name': 'Login',
        'icon': 'work',
        'open': true,
        'link': '../login'
      },
      {
        'name': 'Register',
        'icon': 'work',
        'open': true,
        'link': '../register'
      },
      {
        'name': 'Progress Spinner',
        'link': 'material-widgets/spinner',
        'icon': 'cached',
        'chip': false,
        'open': false
      }*/
    ]
  }
  /*{
      'name': 'Material Widget',
      'icon': 'widgets',
      'link': false,
      'open': false,
      'sub': [
          {
              'name': 'Buttons',
              'link': 'material-widgets/buttons',
              'icon': 'indeterminate_check_box',
              'chip': false,
              'open': false,
          },
          {
              'name': 'List',
              'link': 'material-widgets/list',
              'icon': 'list',
              'chip': false,
              'open': false,
          },
          {

              'name': 'Stepper',
              'link': 'material-widgets/stepper',
              'icon': 'view_week',
              'chip': false,
              'open': false,

          },
          {
              'name': 'Expansion',
              'link': 'material-widgets/expansion',
              'icon': 'web_aaset',
              'chip': false,
              'open': false,
          },
          {
              'name': 'Progress Spinner',
              'link': 'material-widgets/spinner',
              'icon': 'cached',
              'chip': false,
              'open': false,
          },
          {
              'name': 'Cards',
              'link': 'material-widgets/cards',
              'icon': 'crop_16_9',
              'chip': false,
              'open': false,
          },
          {
              'name': 'Icons',
              'link': 'material-widgets/icons',
              'icon': 'gif',
              'chip': false,
              'open': false,
          },
          {

              'name': 'AutoComplete',
              'link': 'material-widgets/autocomplete',
              'icon': 'get_app',
              'chip': false,
              'open': false,
          },
          {
              'name': 'CheckBox',
              'link': 'material-widgets/checkbox',
              'icon': 'check_box',
              'chip': false,
              'open': false,
          },
          {
              'name': 'DatePicker',
              'link': 'material-widgets/datepicker',
              'icon': 'date_range',
              'chip': false,
              'open': false,
          },

          {
              'name': 'Slider',
              'link': 'material-widgets/slider',
              'icon': 'keyboard_tab',
              'chip': false,
              'open': false,
          },
          {
              'name': 'Slide Toggle',
              'link': 'material-widgets/slide-toggle',
              'icon': 'album',
              'chip': false,
              'open': false,
          },
          {
              'name': 'Menu',
              'icon': 'menu',
              'link': 'material-widgets/menu',
              'chip': false,
              'open': false,
          },
          {
              'name': 'Progress Bar',
              'link': 'material-widgets/progress-bar',
              'icon': 'trending_flat',
              'chip': false,
              'open': false,
          },
          {
              'name': 'Input',
              'icon': 'input',
              'link': 'material-widgets/input',
              'open': false,
          },
          {
              'name': 'Radio',
              'icon': 'radio_button_checked',
              'link': 'material-widgets/radio',
              'chip': false,
              'open': false,
          },
          {
              'name': 'Select',
              'icon': 'select_all',
              'link': 'material-widgets/select',
              'open': false,
          },
      ]
  },*/
  // {
  //     'name'   : 'Forms',
  //     'icon'   : 'mode_edit',
  //     'open'   : false,
  //     'link'   : false,
  //     'sub'    :  [
  //                     {
  //                         'name': 'Template Driven',
  //                         'icon': 'mode_edit',
  //                         'open'   : false,
  //                         'link':'forms/template_forms'
  //                     },
  //                     {
  //                         'name': 'Reactive Forms',
  //                         'icon': 'text_fields',
  //                         'open'   : false,
  //                         'link':'forms/reactive_forms'
  //                     }
  //                 ]
  // },
  /* {
       'name': 'Tables',
       'icon': 'list',
       'link': false,
       'open': false,
       'chip': { 'value': 2, 'color': 'accent' },
       'sub': [
           {
               'name': 'Fixed',
               'icon': 'filter_list',
               'link': 'tables/fixed',
               'open': false,
           },
           {
               'name': 'Feature',
               'icon': 'done_all',
               'link': 'tables/featured',
               'open': false,
           },
           {
               'name': 'Responsive Tables',
               'icon': 'filter_center_focus',
               'link': 'tables/responsive',
               'open': false,
           }
       ]

   },*/
  /*{
      'name': 'Guarded Routes',
      'icon': 'mode_edit',
      'link': '/auth/guarded-routes',
      'open': false,
  }, */
  /*{
      'name': 'Scrumboard',
      'open': false,
      'link': '/auth/scrumboard',
      'icon': 'grade',
  }, */
  /*{
      'name': 'Applications',
      'icon': 'view_module',
      'open': false,
      'link': false,
      'sub': [
          {
              'name': 'chat',
              'icon': 'chat',
              'link': 'chats/chat',
              'open': false,
          },
          {
              'name': 'mail',
              'icon': 'mail',
              'link': 'mail/mail',
              'open': false,
          },
          {
              'name': 'Editor',
              'icon': 'editor',
              'link': 'editor/editor',
              'open': false,
          }
      ]
  }*/
  /*, {
      'name': 'Pages',
      'icon': 'content_copy',
      'open': false,
      'link': false,
      'sub': [
          {
              'name': 'Login',
              'icon': 'work',
              'open': false,
              'link': '../login',
          }, {
              'name': 'Services',
              'icon': 'local_laundry_service',
              'open': false,
              'link': 'pages/services',
          }, {
              'name': 'Contact',
              'icon': 'directions',
              'open': false,
              'link': 'pages/contact'
          }
      ]
  }*/
  /*, {

      'name': 'Charts',
      'icon': 'pie_chart_outlined',
      'open': false,
      'link': false,
      'sub': [
          {
              'name': 'chartjs',
              'icon': 'view_list',
              'link': 'charts/chartjs',
              'open': false,

          },
          {
              'name': 'ngx-chart',
              'icon': 'show_chart',
              'open': false,
              'link': 'charts/ngx-charts',
          },
          // {
          //     'name': 'nvd3',
          //     'icon': 'pie_chart',
          //     'open': false,
          //     'link': 'charts/nvd3-charts',
          // }
      ]
  },*/
  // {
  //     'name': 'maps',
  //     'icon': 'map',
  //     'open': false,
  //     'link': false,
  //     'sub': [
  //         {
  //             'name': 'google-map',
  //             'icon': 'directions',
  //             'link': 'maps/googlemap',
  //             'open': false,
  //         },
  //         {
  //             'name': 'leaflet-map',
  //             'icon': 'directions',
  //             'link': 'maps/leafletmap',
  //             'open': false,
  //         }
  //     ]
  // }
];
