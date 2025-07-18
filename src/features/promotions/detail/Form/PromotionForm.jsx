import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import BaseButton from '@shared/components/BaseButton/BaseButton';
import formService from '@services/form/form';
const PromotionForm = (props) => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);

	const onFinish = async (values) => {
		try {
			setLoading(true);
			const payload = {
				request: {
					promotion_name: props.slug,
					name: values.nama,
					no_hp: values.no_hp,
					email: values.email,
					lokasi: values.lokasi,
				},
			};

			await formService.submitFormResult(payload);

			message.success('Form submitted successfully!');
			form.resetFields();

			window.open(props.url, '_blank');
		} catch (error) {
			message.error('Failed to submit the form. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Form
			form={form}
			layout='vertical'
			onFinish={onFinish}
			style={{ maxWidth: 430, margin: '0 auto' }}
			className='border p-8 lg:shadow-lg '
		>
			<h2 className='text-center text-2xl font-extrabold text-primary'>Siap Konsultasi?</h2>
			<h2 className='mb-12 text-center text-2xl font-medium text-primary'>Lengkapi Data Anda!</h2>

			<Form.Item
				label={<span className='text-primary'>Nama Lengkap</span>}
				name='nama'
				rules={[
					{ required: true, message: 'Masukkan nama Anda' },
					{
						max: 100,
						message: 'Nama tidak boleh lebih dari 100 digit',
					},
				]}
			>
				<Input placeholder='Masukkan nama Anda' required className='rounded-lg border-2 border-[#90cbc6] py-3' />
			</Form.Item>

			<Form.Item
				label={<span className='text-primary'>No WhatsApp</span>}
				name='no_hp'
				rules={[
					{ required: true, message: 'Masukkan nomor handphone Anda' },
					{
						pattern: /^\d+$/,
						message: 'Nomor handphone harus berupa angka',
					},
					{
						max: 16,
						message: 'Nomor handphone tidak boleh lebih dari 16 digit',
					},
				]}
			>
				<Input
					placeholder='08123456789'
					required
					className='rounded-lg border-2 border-[#90cbc6] py-3'
					maxLength={16}
				/>
			</Form.Item>

			<Form.Item
				label={<span className='text-primary'>Lokasi</span>}
				name='lokasi'
				rules={[
					{ required: true, message: 'Masukkan lokasi Anda' },
					{
						max: 100,
						message: 'Lokasi tidak boleh lebih dari 100 digit',
					},
				]}
			>
				<Input placeholder='Jakarta' required className='rounded-lg border-2 border-[#90cbc6] py-3' />
			</Form.Item>

			<Form.Item
				label={<span className='text-primary'>Email</span>}
				name='email'
				rules={[{ type: 'email', message: 'Format email tidak valid' }]}
			>
				<Input placeholder='john.doe@example.com' className='rounded-lg border-2 border-[#90cbc6] py-3' />
			</Form.Item>

			<Form.Item>
				<div className='flex w-full justify-center'>
					<BaseButton
						buttonClassName=' max-w-3/4 text-xl mt-5 text-white disabled:bg-gray-500'
						type='primary'
						htmlType='submit'
						loading={loading}
						notRounded
					>
						Konsultasi Sekarang
					</BaseButton>
				</div>
			</Form.Item>
		</Form>
	);
};

export default PromotionForm;
