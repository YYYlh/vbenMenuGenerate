exports.getDrawerTemplate = function (name, upperCaseName, path) {
    return `
<template>
    <BasicDrawer
        v-bind="$attrs"
        @register="registerDrawer"
        showFooter
        :title="getTitle"
        width="50%"
        @ok="handleSubmit"
    >
        <Skeleton :loading="skeletonLoading" active />
        <BasicForm v-show="!skeletonLoading" @register="registerForm" />
    </BasicDrawer>
</template>
<script lang="ts">
import { defineComponent, ref, computed, unref } from 'vue';
import { Skeleton } from 'ant-design-vue';
import { BasicForm, useForm } from '/@/components/Form/index';
import { formSchema } from './${name}.data';
import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
import { add${upperCaseName}Api, update${upperCaseName}Api, ${name}DetailByIdApi } from '/@/api/${path}/${name}';

export default defineComponent({
    name: '${upperCaseName}Drawer',
    components: { BasicDrawer, BasicForm, Skeleton },
    emits: ['success', 'register'],
    setup(_, { emit }) {
        const isUpdate = ref<boolean>(true);
        const skeletonLoading = ref<boolean>(false);
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
                skeletonLoading.value = true;
                const res = await ${name}DetailByIdApi(data.id)
                setFieldsValue({
                    ...res.data,
                });
                skeletonLoading.value = false;
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
            skeletonLoading,
        };
    },
});
</script>`;
};