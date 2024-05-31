import React, { useContext, useEffect, useState } from 'react';

import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import Tiptap from '@/components/editor/Editor';
import Button from '@mui/material/Button';

import { FormProvider, SubmitHandler, useForm, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreatePostBodySchema } from '@/api/post/create/post.validate';
import { schema as CreatePostSchema } from '@/api/post/create/post.validate';

import { useNavigate, useParams } from 'react-router-dom';
import useLogout from '@/hooks/useLogout';

import { AxiosError } from 'axios';
import { TiptapContext } from '@/components/editor/EditorProvider';

import getPostDetailAPI from '@/api/post/detail/post.api';
import createPostAPI from '@/api/post/create/post.api';
import updatePostAPI from '@/api/post/update/post.api';
import getCategoryAPI from '@/api/category/get/category.api';
import { Category } from '@/api/category/get/category.type';

import { getUser } from '@/utils/utils';

type FormValues = CreatePostBodySchema;

export default function CreatePost() {
    const defaultTheme = createTheme();
    const { id } = useParams();
    const { handleLogout } = useLogout();
    const navigator = useNavigate();
    const { editor, content } = useContext(TiptapContext);
    const [newCategory, setNewCategory] = useState<string>('');

    const methods = useForm<FormValues>({
        resolver: zodResolver(CreatePostSchema),
        defaultValues: { category: '' },
    });
    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors },
    } = methods;

    useEffect(() => {
        if (editor && id) {
            fetchData(id);
        }
    }, [editor, id]);

    useEffect(() => {
        if (editor) {
            setValue('content', editor?.getHTML());
        }
    }, [editor, content]);

    const onSubmit: SubmitHandler<FormValues> = async (input: FormValues) => {
        try {
            let categoryValue = input.category;

            if (categoryValue === 'custom') {
                categoryValue = newCategory;
            }
            const body = {
                ...input,
                category: categoryValue,
            };

            if (id) {
                const resp = await updatePostAPI(id, body);
                if (resp.resultCd === 200) {
                    const id = resp.data.id;
                    navigator(`/post/${id}`);
                }
            } else {
                const resp = await createPostAPI(body);
                if (resp.resultCd === 200) {
                    const id = resp.data.id;
                    navigator(`/post/${id}`);
                }
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                const { status } = error.request;
                if (status === 401) {
                    alert('토큰 만료');
                    handleLogout();
                }
            } else {
                console.log('error: ', error);
            }
        }
    };

    if (!editor) return null;

    const fetchData = async (id: string | number) => {
        try {
            const resp = await getPostDetailAPI(id);
            if (resp.resultCd === 200) {
                const {
                    data: { content, title },
                } = resp;
                editor.commands.setContent(content);
                setValue('title', title);
                setValue('content', content);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Container maxWidth="xl">
                <FormProvider {...methods}>
                    <form className="create-post-form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="editor-container w-[80%] m-auto flex justify-center flex-col h-full ">
                            <div className="editor-title mt-5">
                                <textarea
                                    {...register('title', { required: true })}
                                    placeholder="제목을 입력하세요"
                                    className="w-full h-[4rem] text-[2.5rem] font-bold resize-none"
                                />
                            </div>
                            <CategoryContainer newCategory={newCategory} setNewCategory={setNewCategory} />

                            <div className="editor-wrapper w-full border overflow-auto">
                                <Tiptap />
                            </div>
                            <div className="editor-footer flex justify-between mt-2">
                                <div className="editor-footer-button-left">
                                    <Button variant="outlined" onClick={() => navigator(-1)}>
                                        나가기
                                    </Button>
                                </div>
                                <div className="editor-footer-button-right">
                                    <Button variant="contained" color="success" type="submit">
                                        등록
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </FormProvider>
            </Container>
        </ThemeProvider>
    );
}

interface CategoryContainerProps {
    newCategory: string;
    setNewCategory: any;
}
function CategoryContainer({ newCategory, setNewCategory }: CategoryContainerProps) {
    const [category, setCategory] = useState<Category[]>([]);
    const [customCategory, setCustomCategory] = useState<boolean>(false);

    const {
        register,
        watch,
        setValue,
        getValues,
        formState: { errors },
    } = useFormContext<FormValues>();
    const { id } = getUser();
    if (!id) return null;

    const getCategory = async () => {
        const resp = await getCategoryAPI(id);
        if (resp.resultCd === 200) {
            setCategory(resp.data);
        } else {
            console.error(resp.resultMsg);
        }
    };
    useEffect(() => {
        getCategory();
    }, []);

    const formmatedCategory = category.map((item) => {
        return {
            categoryId: item.id,
            categoryName: item.name,
        };
    });

    const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const category = e.target.value;
        setValue('category', category);

        if (category === 'custom') {
            setCustomCategory(true);
        } else {
            setNewCategory('');
            setValue('category', category);
            setCustomCategory(false);
        }
    };
    const handleChangeCategoryInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNewCategory(value);
    };
    return (
        <>
            <div className="editor-category-tag-wrapper flex items-center">
                <select
                    {...register('category', { required: true, onChange: (e) => handleChangeCategory(e) })}
                    id="category-select"
                    className="block w-[20%] px-4 py-2 pr-8 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                >
                    <option value="" disabled>
                        카테고리
                    </option>
                    {formmatedCategory.map((category) => (
                        <option key={category.categoryId} value={category.categoryName}>
                            {category.categoryName}
                        </option>
                    ))}
                    <option value="custom">직접 입력</option>
                </select>
                {customCategory && (
                    <input
                        value={newCategory}
                        onChange={(e) => handleChangeCategoryInput(e)}
                        type="text"
                        placeholder="새로운 카테고리 입력"
                        className="block w-[20%] px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                    />
                )}
            </div>

            {errors.category && <span className="text-red-600">카테고리를 선택해 주세요!</span>}
        </>
    );
}
