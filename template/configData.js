exports.getConfigDataTemplate = function () {
    return `
import { BasicColumn, FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
    {
        dataIndex: '',
        title: '',
    },
];
export const searchFormSchema: FormSchema[] = [
    {
        field: '',
        label: '',
        component: 'Input',
        colProps: {
            span: 8,
        },
    },
];
export const formSchema: FormSchema[] = [
    {
        field: 'id',
        label: 'Id',
        component: 'Input',
        show: false,
    },
];`;
};
