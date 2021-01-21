/* eslint-disable no-console */
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Switch as MaterialSwitch,
  TextField,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Save } from '@material-ui/icons';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TextAreaField from './components/TextAreaField';

import { encrypt, decrypt } from './helpers/encryption';
import { xorDecrypt, xorEncrypt } from './helpers/xorEncryption';

const { dialog } = require('electron').remote;
const fs = require('fs');
const path = require('path');

const MainComponent = () => {
  const [gammaMethod, setGammaMethod] = useState('createGammaFirst');
  const [isEditable, setEditable] = useState(false);
  const [gammaKey, setGammaKey] = useState('');
  const [encryption, setEncryption] = useState(false);
  const [alphabet, setAlphabet] = useState('RUSENG');
  const [message, setMessage] = useState({
    title: '',
    type: 'severity',
    visibility: false,
  });
  const [text, setText] = useState('');

  const handleChange = (event: any) => {
    const { value, name } = event.target;
    switch (name) {
      case 'gamma':
        setGammaKey(value);
        break;
      case 'gammaMethod':
        setGammaMethod(value);
        break;
      case 'editable':
        setEditable(!isEditable);
        break;
      case 'alphabet':
        setAlphabet(value);
        break;
      case 'encryption':
        setEncryption(!encryption);
        break;
      default:
        break;
    }
  };

  const snackBarOpen = (title: string, type: string) => {
    setMessage({ title, type, visibility: true });
  };
  const snackBarClose = (_: React.SyntheticEvent, reason: string): void => {
    if (reason === 'clickaway') {
      return;
    }
    setMessage({ ...message, visibility: false });
  };

  const openDialog = () => {
    dialog
      .showOpenDialog({ properties: ['openFile'] })
      .then((response: FileResponse) => {
        if (!response.canceled) {
          const [textFilePath] = response.filePaths;
          fs.readFile(textFilePath, 'utf-8', (err: any, data: any) => {
            if (err) {
              return;
            }
            setText(data);
            snackBarOpen('Файл открыт!', 'success');
          });
        } else {
          snackBarOpen('Файл не был выбран!', 'warning');
        }
      });
  };

  const saveDialog = () => {
    dialog
      .showSaveDialog({
        title: 'Выберите место сохранения файла',
        defaultPath: path.join(__dirname, '../Файл.txt'),
        buttonLabel: 'Сохранить',
        filters: [
          {
            name: 'Text Files',
            extensions: ['txt', 'docx'],
          },
        ],
        properties: [],
      })
      .then((file: any) => {
        if (!file.canceled) {
          fs.writeFile(file.filePath.toString(), text, (err: any) => {
            if (err) throw err;
            snackBarOpen('Сохранено!', 'success');
          });
        }
      })
      .catch((err: any) => {
        snackBarOpen(err.toString(), 'error');
      });
  };

  const handleEncryption = () => {
    const newText = !encryption
      ? encrypt(text, gammaKey, gammaMethod, alphabet)
      : xorEncrypt(text, gammaKey, gammaMethod, alphabet);
    setText(newText);
    snackBarOpen('Текст был расшифрован!', 'success');
  };
  const handleDecryption = () => {
    const newText = !encryption
      ? decrypt(text, gammaKey, gammaMethod, alphabet)
      : xorDecrypt(text, gammaKey, gammaMethod, alphabet);
    setText(newText);
    snackBarOpen('Текст был зашифрован!', 'success');
  };

  return (
    <>
      <div className="buttonBlock">
        <Button
          variant="contained"
          color="primary"
          disabled={!text || !gammaKey}
          onClick={handleEncryption}
        >
          Зашифровать
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={!text || !gammaKey}
          onClick={handleDecryption}
        >
          Расшифровать
        </Button>
        <Button variant="contained" color="primary" onClick={openDialog}>
          Выбрать файл
        </Button>
        <FormControlLabel
          control={
            <MaterialSwitch
              value={isEditable}
              color="primary"
              name="editable"
              onChange={handleChange}
            />
          }
          label="Редактирование"
          labelPlacement="start"
        />
      </div>
      <div className="textContainer">
        <div className="textContainer__controls">
          <TextField
            required
            value={gammaKey}
            name="gamma"
            label="Гамма ключ"
            onChange={handleChange}
          />
          <FormControl className="selectForm">
            <InputLabel id="label-method">Метод гаммы</InputLabel>
            <Select
              labelId="label-method"
              id="label-method-select"
              name="gammaMethod"
              value={gammaMethod}
              onChange={handleChange}
            >
              <MenuItem value="createGammaFirst">Метод 1</MenuItem>
              <MenuItem value="createGammaSecond">Метод 2</MenuItem>
              <MenuItem value="createGammaThird">Метод 3</MenuItem>
              <MenuItem value="createGammaWithPseudoRandom">
                Псевдорандом
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl className="selectForm">
            <InputLabel id="alphabet-label">Алфавит</InputLabel>
            <Select
              labelId="alphabet-label"
              id="alphabet-select"
              name="alphabet"
              value={alphabet}
              onChange={handleChange}
            >
              <MenuItem value="RUS">Русский</MenuItem>
              <MenuItem value="ENG">Английский</MenuItem>
              <MenuItem value="RUSENG">РусАнг</MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <MaterialSwitch
                value={encryption}
                color="primary"
                name="encryption"
                onChange={handleChange}
              />
            }
            label="XOR"
            labelPlacement="start"
          />
        </div>
        <TextAreaField text={text} setText={setText} editable={isEditable} />
      </div>
      <div className="buttonBlock">
        <Button
          variant="contained"
          color="primary"
          onClick={saveDialog}
          disabled={!text || !gammaKey}
          startIcon={<Save />}
        >
          Сохранить в файл
        </Button>
      </div>
      <Snackbar
        open={message.visibility}
        autoHideDuration={2000}
        onClose={snackBarClose}
      >
        <Alert onClose={snackBarClose as any} severity={message.type as any}>
          {message.title}
        </Alert>
      </Snackbar>
    </>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={MainComponent} />
      </Switch>
    </Router>
  );
}
