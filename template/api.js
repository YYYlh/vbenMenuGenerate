exports.getApiTemplate = function (name, upperCaseName) {
  return `
import { defHttp } from '/@/utils/http/axios';
import { ContentTypeEnum } from '/@/enums/httpEnum';
import { BasicFetchPageResult, BasicFetchResult } from '/@/api/model/baseModel';
import { ${upperCaseName}Item } from './model/${name}Model';

enum Api {
    List = '',
    Add = '',
    Update = '',
    Delete = '',
    Detail = '',
}

// 列表
export const ${name}PageListApi = (params) => {
    return defHttp.post<BasicFetchPageResult<${upperCaseName}Item>>({
        url: Api.List,
        data: params,
    });
};

// 新增
export const add${upperCaseName}Api = (params) => {
    return defHttp.post({
        url: Api.Add,
        data: params,
    });
};

// 编辑
export const update${upperCaseName}Api = (params) => {
    return defHttp.post({
        url: Api.Update,
        data: params,
    });
};

// 删除
export const delete${upperCaseName}ByIdApi = (id: string) => {
    return defHttp.post<BasicFetchResult<Boolean>>({
        url: Api.Delete,
        params: { id },
        headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    });
};

// 详情
export const ${name}DetailByIdApi = (id: string) => {
    return defHttp.post<BasicFetchResult<${upperCaseName}Item>>({
        url: Api.Detail,
        params: { id },
        headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    });
};`;
};

exports.getModelTemplate = function (name) {
  const upperCaseName = name.replace(name[0], name[0].toUpperCase());
  return `
export interface ${upperCaseName}Item {
 
}`;
};
