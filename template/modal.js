exports.getModalTemplate = function (name, upperCaseName, path) {
  return `
<template>
    <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
        <BasicForm @register="registerForm" />
    </BasicModal>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: '',
});
</script>
<script lang="ts" setup>

import { ref, defineEmits } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { BasicForm, useForm } from '/@/components/Form';
import { formSchema } from './${name}.data';
import { add${upperCaseName}Api, update${upperCaseName}Api } from '/@/api/${path}/${name}';

const emit = defineEmits(['reload', 'register']);
const getTitle = ref<string>('');
const [registerModal, { closeModal, changeOkLoading }] = useModalInner((data) => {
  if (!data.id) {
    getTitle.value = '新增';
  } else {
    getTitle.value = '修改';
    for (const item of formSchema) {
      setFieldsValue({ [item.field]: data[item.field] });
    }
  }
});

const [registerForm, { submit, validate, setFieldsValue, resetFields }] = useForm({
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 10,
  },
  schemas: formSchema,
  submitFunc: handleSubmit,
  showActionButtonGroup: false,
});

async function handleSubmit() {
  const value = await validate();
  changeOkLoading(true);
  try {
    await (value.id ? update${upperCaseName}Api(value) : add${upperCaseName}Api(value));
  } catch (e) {
  } finally {
    changeOkLoading(false);
    await resetFields();
    emit('reload');
    closeModal();
  }
}
async function handleOk() {
  await submit();
}
</script>`;
};
