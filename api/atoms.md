#Atoms

- nome: String 									[feito]  atom-name-config.js
- descricao: String 						[feito]  atom-description-config.js
- departamento: String 					[feito]  atom-department-config.js
- supervisor: String 						[feito]  atom-supervisor-config.js
- permissao: String  						[feito]  atom-permission-config.js
- perfil: String 								[feito]  atom-perfil.js
- password: String 							[feito]  atom-password
- email: String  								[feito]  atom-email-config.js
- tipoStatus: String 						[feito]  atom-status-config.js
- icone: String 								[feito]  atom-icon-config.js
- DeviceID: String 							[feito]  atom-deviceId-config
	# Note: Os atom-alarms-config são a junção entre time e colour
- timer: Timestamp  						[feito]  atom-time-config.js
- cor: String  									[feito]  atom-colour-config.js

#Adicionados depois
- ativarUser: Boolean 					[feito]  atom-active-config.js // Ja tinha um atom chamado active
- divisao: String 							[feito]  atom-macroDepartament-config.js
- logarAuto: Boolean  					[feito]  atom-automaticLogin-config.js
- fabricante: String  					[feito]  atom-manufacturer-config.js
- modelo: String 								[feito]  atom-model-config.js
- ip: String 									  [feito]  atom-ip-config.js
- port: Number                  [feito]	 atom-port-config.js
- indisponivel: Boolean 				[feito]  atom-unavailable-config.js
- login: String  								[feito]  atom-username-config.js

- Max/exec: Timestamp 					[feito]  atom-timeMaxUnavailableByExec-config.js // Tempo máximo de inativadade por execução
- execucoes: Number 						[feito]  atom-numberMaxExecByInterval-config.js // Quantidade maxima de execuções dentro do intervalo determinal
- interval: Date 								[feito]  atom-timeMinBetweenRuns-config.js // Tempo minimo do intervalo entre as execuções
- bloquearUseTemp: Boolean 			[feito]  atom-blockByTime-config.js // Bloqueia a pausa do usúario após o Max/exec ser atingido
- bloquearUseNumberExec: Boolean[feito]  atom-blockByNumberRuns-config.js // Bloqueia a pausa do usário após axceder numero de execuções

```
- deviceType: String   [feito]  atom-deviceType-config.js // Pode ser ramal, grupo, troco, ogm
- trunk: 	// Troco tem nome e deviceId
- ogm:  // OGM tem nome e deviceId
- grupo: Array
- devicesId: Array  // Array de devices