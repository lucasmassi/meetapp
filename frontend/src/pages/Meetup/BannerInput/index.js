import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';
import { MdWallpaper } from 'react-icons/md';
import { FaSpinner } from 'react-icons/fa';

import api from '../../../services/api';

import { Container } from './styles';

export default function BannerInput() {
  const { defaultValue, registerField } = useField('banner');

  const [loading, setLoading] = useState(0);
  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'banner_id',
        ref: ref.current,
        path: 'dataset.file',
      })
    }
  }, [ref.current]);

  async function handleChange(e) {
    setLoading(1);
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
    setLoading(0);
  }

  return (
    <Container loading={loading}>
      <label htmlFor="banner">
        {loading ? <FaSpinner syze={32} /> : (
          <>
            <img src={preview || ''} alt="" />
            {preview ? '' : (
              <h4>
                <MdWallpaper />
                Selecionar imagem
                  </h4>
            )}
            <input
              type="file"
              id="banner"
              accept="image/*"
              data-file={file}
              onChange={handleChange}
              ref={ref}
            />
          </>
        )}
      </label>
    </Container >
  );
}
