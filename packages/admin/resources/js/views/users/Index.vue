<template>
  <div v-if="processing" class="mt-8 flex justify-center">
    <Loader size="40" color="#5850ec" />
  </div>

  <div v-else>
    <section v-if="indexInvitation.data?.data?.length" class="mb-8">
      <Topbar :title="__('Pending Invitations')">
        <div v-if="can('user:create')" class="ltr:ml-auto rtl:mr-auto">
          <TheButton
            size="sm"
            data-cy="topbar-invitation-create-button"
            @click="openInvitationModal"
          >
            {{ __('Invite Team Member') }}
          </TheButton>
        </div>
      </Topbar>

      <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div
            class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"
          >
            <div
              class="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg"
            >
              <table class="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <TableTh
                      name="invitation"
                      :index="indexInvitation"
                      :label="__('Email')"
                      sort="email"
                    />
                    <TableTh
                      name="invitation"
                      :index="indexInvitation"
                      :label="__('Role')"
                    />
                    <th class="bg-gray-50 px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr v-for="item in indexInvitation.data.data" :key="item.id">
                    <td
                      class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-500"
                    >
                      {{ item.email }}
                    </td>
                    <td
                      class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-500"
                    >
                      {{ item.role.name }}
                    </td>

                    <td
                      class="flex items-center justify-end whitespace-nowrap px-6 py-4 text-right text-sm font-medium leading-5"
                    >
                      <TrashIcon
                        v-if="can('user:delete')"
                        class="ml-2 w-5 cursor-pointer text-gray-400 hover:text-gray-800"
                        @click.prevent="indexInvitation.deleteIt(item.id)"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>

              <IndexPagination :index="indexInvitation" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <Topbar :title="__('Team Members')">
        <div class="ltr:ml-auto rtl:mr-auto">
          <TheButton
            v-if="can('user:create') && !indexInvitation.data.data.length"
            size="sm"
            data-cy="topbar-invitation-create-button"
            @click="openInvitationModal"
          >
            {{ __('Invite Team Member') }}
          </TheButton>

          <TheButton
            v-if="can('user:create')"
            class="ltr:ml-2 rtl:mr-2"
            size="sm"
            data-cy="topbar-create-button"
            @click="openModal"
          >
            {{ __('Create Team Member') }}
          </TheButton>
        </div>
      </Topbar>

      <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div
            class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"
          >
            <div
              class="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg"
            >
              <table class="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <TableTh
                      name="user"
                      :index="indexUser"
                      :label="__('Name')"
                      sort="name"
                    />
                    <TableTh
                      name="user"
                      :index="indexUser"
                      :label="__('Role')"
                    />
                    <th class="bg-gray-50 px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr v-for="item in indexUser.data.data" :key="item.id">
                    <td
                      class="whitespace-no-wrap px-6 py-4 text-sm font-medium text-gray-500"
                    >
                      <div class="flex">
                        <UserAvatar class="h-6 w-6" :avatar="item.avatar" />
                        <div class="text-sm ltr:ml-3 rtl:mr-3">
                          <span
                            class="mb-1 block truncate text-sm font-medium leading-none text-gray-900"
                          >
                            {{ item.name }}
                          </span>
                          <span class="block text-sm font-normal text-gray-500">
                            {{ item.email }}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td
                      class="whitespace-no-wrap px-6 py-4 text-sm font-medium text-gray-500"
                    >
                      {{ item.roles[0].name }}
                    </td>

                    <td
                      class="whitespace-no-wrap flex items-center justify-end px-6 py-4 text-right text-sm font-medium leading-5"
                    >
                      <span
                        v-if="can('user:update')"
                        class="ml-2"
                        @click="openModal(item.id)"
                      >
                        <PencilSquareIcon
                          class="w-5 cursor-pointer text-gray-400 hover:text-gray-800"
                        />
                      </span>

                      <TrashIcon
                        v-if="can('user:delete')"
                        class="ml-2 w-5 cursor-pointer text-gray-400 hover:text-gray-800"
                        @click.prevent="indexUser.deleteIt(item.id)"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>

              <IndexPagination :index="indexUser" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useIndexStore, useModalsStore } from 'spack'
  import {
    IndexPagination,
    Loader,
    TableTh,
    TheButton,
    Topbar,
    UserAvatar,
  } from 'thetheme'
  import InvitationForm from './InvitationForm.vue'
  import Form from './Form.vue'
  import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline'

  const indexUser = useIndexStore('user')(),
    indexInvitation = useIndexStore('invitation')(),
    processing = ref(true)
  // invitations = ref([])

  checkProcessing()

  indexUser.setConfig({
    uri: 'users',
    orderByDirection: 'desc',
  })
  indexUser.fetch()

  indexInvitation.setConfig({
    uri: 'invitations',
    orderByDirection: 'desc',
  })
  indexInvitation.fetch()

  function checkProcessing() {
    setTimeout(function () {
      if (indexUser.fetching || indexInvitation.fetching) {
        checkProcessing()
        return
      }

      renderData()
    }, 150)
  }

  function renderData() {
    processing.value = false
  }

  function openInvitationModal(id = null) {
    useModalsStore().add(InvitationForm, { id })
  }

  function openModal(id: number | null = null) {
    useModalsStore().add(Form, { id })
  }
</script>
