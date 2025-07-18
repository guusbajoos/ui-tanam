export const secureUrlToHttps = (url) => {
	const regex = new RegExp('^(http|https)://', 'i');
	const match = regex.test(url);

	return match ? url : `https://${url}`;
};

export const convertToSlug = (slug) => {
	return slug
		.toLowerCase()
		.replace(/ /g, '-')
		.replace(/[^\w-]+/g, '');
};

export const convertObjToQs = (obj) => {
	return Object.keys(obj)
		.map((key) => `${key}=${obj[key]}`)
		.join('&');
};

export const formatingTag = (value) => {
	if (!value) return '';

	return value.replace(/-/g, ' ').replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
};

export const paginate = (data, currentPage, pageSize) => {
	const startIndex = (currentPage - 1) * pageSize;
	return data.slice(startIndex, startIndex + pageSize); // 0, 9
};

export const capitalize = (str) => {
	if (!str) return '';

	const arr = str.split('_').join(' ').toLowerCase();
	const result = arr.split(' ');

	for (var i = 0; i < result.length; i++) {
		result[i] = result[i].charAt(0).toUpperCase() + result[i].slice(1);
	}

	return result.join(' ');
};

export const matchWhatsAppURL = (text) => {
	const regex = /(https?:\/\/)?api\.whatsapp\.com\/send\?phone=[0-9]+&text=([^&]+)/;
	return regex.test(text);
};

export const getElementChildAttribute = (args) => {
	const { elementId, attribute, property, condition = [], value } = args;

	const element = document.getElementById(elementId);

	if (element) {
		const children = element.children;

		for (let i = 0; i < children.length; i++) {
			const child = children[i];

			if (child.hasAttribute(attribute)) {
				if (condition.some((cond) => child.style[property] === cond)) child.style[property] = value;
			} else child.setAttribute(attribute, `${property}: ${value}`);
		}
	}
};

export const manipulateNestedElementAttribute = (args) => {
	const { elementId, attribute, conditions = [] } = args;

	const manipulateAttribute = (element) => {
		if (element.hasAttribute(attribute)) {
			conditions.forEach((condition) => {
				const { property, values, newValue } = condition;
				if (element.style[property] && values.includes(element.style[property])) {
					element.style[property] = newValue;
				}
			});
		} else {
			conditions.forEach((condition) => {
				const { property, newValue } = condition;
				element.setAttribute(attribute, `${property}: ${newValue}`);
			});
		}

		for (let i = 0; i < element.children.length; i++) {
			const child = element.children[i];

			if (
				['strong', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(child.tagName.toLowerCase()) &&
				child.style['font-size'] !== undefined
			)
				child.style['font-size'] = '28px';
			if (['span'].includes(child.tagName.toLowerCase()) && child.style['font-size'] !== undefined)
				child.style['font-size'] = '18px';

			manipulateAttribute(element.children[i]);
		}
	};

	const element = document.getElementById(elementId);

	if (element) manipulateAttribute(element);
};
