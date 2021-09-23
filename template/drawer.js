exports.getDrawerTemplate = function (name, upperCaseName, path) {
    return `
<template>
    <BasicDrawer
        v-bind="$attrs"
        @register="registerDrawer"
        showFooter
        :title="getTitle"
        width="500px"
        @ok="handleSubmit"
    >
        <BasicForm @register="registerForm" />
    </BasicDrawer>
</template>
<script lang="ts">
import { defineComponent, ref, computed, unref } from 'vue';
import { BasicForm, useForm } from '/@/components/Form/index';
import { formSchema } from './${name}.data';
import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
import { add${upperCaseName}Api, update${upperCaseName}Api, ${name}DetailByIdApi } from '/@/api/${path}/${name}';

export default defineComponent({
    name: '${upperCaseName}Drawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
        const isUpdate = ref(true);
        const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
            labelWidth: 90,
            schemas: formSchema,
            showActionButtonGroup: false,
        });
        const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
            await resetFields();
            setDrawerProps({ confirmLoading: false });
            isUpdate.value = !!data?.isUpdate;
            if (unref(isUpdate)) {
                const res = await ${name}DetailByIdApi(data.id)
                setFieldsValue({
                    ...res.data,
                });
            }
        });
        const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '编辑'));
        async function handleSubmit() {
            try {
                const values = await validate();
                setDrawerProps({ confirmLoading: true });
                await (isUpdate.value ? update${upperCaseName}Api(values) : add${upperCaseName}Api(values));
                closeDrawer();
                emit('success');
            } finally {
                setDrawerProps({ confirmLoading: false });
            }
        }
        return {
            registerDrawer,
            registerForm,
            getTitle,
            handleSubmit,
        };
    },
});
</script>`;
};