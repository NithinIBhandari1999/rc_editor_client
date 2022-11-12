/* eslint-disable */

import React, { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import toast from 'react-hot-toast';

import { initSocket } from '../../../config/socket';

import constantSocketActions from '../../../constant/constantSocket/constantSocketActions';

let useEffectRunOnce = true;

const EditorPage = () => {
	const roomId = 'Test';

	// -----
	// useState
	const [val, setVal] = useState({
		shouldSync: true,
		code: '',
	});

	// -----
	// useRef
	const monacoEditorRef = useRef(null);
	const monacoEditor2Ref = useRef(null);
	const socketRef = useRef(null);

	// -----
	// useEffect
	useEffect(() => {
		let socketObj = socketRef?.current;

		// let monacoEditorObj = monacoEditorRef?.current;
		// console.log(monacoEditorObj?.getPosition());

		if (socketObj) {
			if (val.shouldSync) {
				socketObj.emit(constantSocketActions.CODE_CHANGE, {
					roomId: 'Test',
					code: val.code,
				});
			}
		}
	}, [val]);

	useEffect(() => {
		const init = async () => {
			try {
				console.log('Init');
				socketRef.current = await initSocket();

				let socketObj = socketRef.current;

				console.log(socketObj);

				socketObj.on('connect_error', (error) => {
					console.error(error);
					toast.error('Socket connection failed, try again later.');
				});

				socketObj.on('connect_failed', (error) => {
					console.error(error);
					toast.error('Socket connection failed, try again later.');
				});

				socketObj.on('connect_failed', (error) => {
					console.error(error);
					toast.error('Socket connection failed, try again later.');
				});

				// -----
				// emit: When user join
				socketObj.emit(constantSocketActions.JOIN, {
					roomId,
					username: location.state?.username,
				});

				// -----
				// on: When user join
				socketObj.on(constantSocketActions.JOINED, (args) => {
					let argsUsername = args.username;
					let argsClientList = args.clientsList;
					if (argsUsername !== location.state?.username) {
						toast.success(`${argsUsername} joined the room`);
					}
					setClients(argsClientList);

					// -----
					// Sync code to new user
					socketRef.current.emit(constantSocketActions.SYNC_CODE, {});
				});

				// -----
				// on: When user join
				socketObj.on(constantSocketActions.CODE_CHANGE, (args) => {
					let argCode = args.code;
					let argRoomId = args.roomId;

					if (typeof argCode === 'string') {
						setVal((prev) => {
							return {
								shouldSync: false,
								code: argCode,
							};
						});
					}

					// -----
					// Sync code to new user
					// socketRef.current.emit(constantSocketActions.SYNC_CODE, {});
				});

				// -----
				// on: When user left
				socketObj.on(constantSocketActions.DISCONNECTED, ({ socketId, username }) => {
					toast.success(`${username} left the room.`);
					setClients((prev) => {
						return prev.filter((client) => client.socketId !== socketId);
					});
				});
			} catch (error) {
				console.error(error);
			}
		};

		if (useEffectRunOnce) {
			init();
		}

		return () => {
			useEffectRunOnce = false;

			let socketObj = socketRef?.current;

			if (socketObj) {
				socketObj.off(constantSocketActions.JOINED);
				socketObj.off(constantSocketActions.DISCONNECTED);
				socketObj.disconnect();
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<h1>Editor Page</h1>

			<Editor
				height='calc(90vh - 10px)'
				defaultLanguage='javascript'
				defaultValue='// some comment'
				theme='vs-dark'
				value={val.code}
				onChange={(e) => {
					console.log(e);
					setVal((prev) => {
						return {
							shouldSync: true,
							code: e,
						};
					});
				}}
				onMount={(a, b) => {
					monacoEditorRef.current = a;
					monacoEditor2Ref.current = b;
					console.log({ a, b });
					console.log({ w: b.editor });
					console.log({ w2: new b.Selection().startLineNumber });
				}}
				editorDidMount={(event) => {
					console.log(event);
				}}
			/>
		</div>
	);
};

export default EditorPage;
