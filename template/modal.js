exports.getModalTemplate = function (name, upperCaseName, path) {
  return `
<template>
    <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
        <BasicForm @register="registerForm" />
    </BasicModal>
</template>
<script lang="ts" setup name="">
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
    let fieldsValue = {}
    for (const item of formSchema) {
      fieldsValue[item.field] = data[item.field];
    }
    setFieldsValue(fieldsValue);
  }
});

const [registerForm, { validate, setFieldsValue, resetFields }] = useForm({
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 10,
  },
  schemas: formSchema,
  showActionButtonGroup: false,
});

async function handleSubmit() {
  const value = await validate();
  changeOkLoading(true);
  await (value.id ? update${upperCaseName}Api(value) : add${upperCaseName}Api(value));
  changeOkLoading(false);
  await resetFields();
  emit('reload');
  closeModal();
}
</script>`;
};
