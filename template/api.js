exports.getApiTemplate = function (name, upperCaseName) {
  return `
import { defHttp } from '/@/utils/http/axios';
import { ContentTypeEnum } from '/@/enums/httpEnum';
import { BasicFetchPageResult, BasicFetchResult } from '/@/api/model/baseModel';
import { ${upperCaseName}Info } from './model/${name}Model';

// 列表
export const ${name}PageListApi = (params) => {
    return defHttp.post<BasicFetchPageResult<${upperCaseName}Info>>({
        url: '',
        data: params,
    });
};

// 新增
export const add${upperCaseName}Api = (params) => {
    return defHttp.post<BasicFetchResult<boolean>>({
        url: '',
        data: params,
    });
};

// 编辑
export const update${upperCaseName}Api = (params) => {
    return defHttp.post<BasicFetchResult<boolean>>({
        url: '',
        data: params,
    });
};

// 删除
export const delete${upperCaseName}ByIdApi = (id: string) => {
    return defHttp.post<BasicFetchResult<boolean>>({
        url: '',
        params: { id },
        headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    });
};

// 详情
export const ${name}DetailByIdApi = (id: string) => {
    return defHttp.post<BasicFetchResult<${upperCaseName}Info>>({
        url: '',
        params: { id },
        headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    });
};`;
};

exports.getModelTemplate = function (name) {
  const upperCaseName = name.replace(name[0], name[0].toUpperCase());
  return `
export interface ${upperCaseName}Info {
 
}`;
};
