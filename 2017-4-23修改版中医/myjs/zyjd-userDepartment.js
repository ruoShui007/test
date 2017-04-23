/*
 ****中医基地-专业科室用户模块
****startTime：2017-4-2 
****author:gaopengfei
*/
/*******省级> 省级用户管理*****/
;(function(){
		
	var thData,
		$creatE,
		$pTo,
		currentPage,
		pageSize;
		
	currentPage = 1,
	pageSize = 10;
	
	//用户管理表头数据
	thData = [
	
	{
		title:"序号",
		name:"",
		width:60,
		align:"center",
		fixedColumn:false,
		checkCol:false,
		valign:"middle",
		renderer:function(name,rowIndex,rowData){
			
			return rowIndex+1+ (currentPage-1)*pageSize;
		}
	}

	,{
		title:"基地名称",
		name:"",
		width:150,
		align:"center",
		fixedColumn:false,
		valign:"middle",
		renderer:function(name,rowIndex,rowData){
			
			return rowData.fName;
		}
	}
	,{
		title:"密码",
		name:"",
		width:60,
		align:"center",
		fixedColumn:false,
		valign:"middle",
		renderer:function(name,rowIndex,rowData){

			return "<div>******</div>" ;
		}
	}
	,{
		title:"批次",
		name:"",
		width:80,
		align:"center",
		fixedColumn:false,
		valign:"middle",
		renderer:function(name,rowIndex,rowData){

			return "<div>"+ rowData.fBatch  +"<div>";

		}
	}
	,{
		title:"备注",
		name:"",
		width:100,
		align:"center",
		renderer:function(name,rowIndex,rowData){	    			
			return "<div>"+ (rowData.fRemark ? rowData.fRemark : '') +"</div>";
			
		}
	}
	,{
		title:"操作",
		name:"",
		width:120,
		align:"center",
		renderer:function(name,rowIndex,rowData){	    			
			
			return "<input type='button' class='bianJi prl12 btn line-h30' value='编辑' />";
			
		}
	}

];
    
	//查询数据
	function getBaseData( _this ) {
	    var args = {};
	    args.fType = "5";
	    args.fProvince=use_info.province;
	    var service = {
	        serviceModule: serviceInfo.serviceModule,
	        serviceNumber: '100040080',
	        token: use_info.token,
	        args: args
	    };

	    commonLogic.serviceCaller(service, function (data) {
	        
	        //console.log(JSON.stringify(data));
	        if(data.flag == "true"){
	        	
	        	console.log( data , typeof data );
	
				_this.init( data );
				

	        }else{
	        	
	            Elf.components.toast({text:data.error});
	        }
	    });
	}	    
    
    
	$creatE = Elf.controls.createElement;
	$pTo = Elf.controls.appendTo;
	
	//---------------------------加载用户管理模块--------------------------------------------
		
	function UserManagement(){
		//页面容器
		this.content = document.querySelector("div.elf_fiexd_center");	
		this.moduleWarp = $creatE('div','full user-department p10');	//内容区容器	
		var _this = this;
		//请求数据
		getBaseData( _this );

	}
	
	//暴露接口
	zyjdModuleByGao.userManage = UserManagement; 	
	
	UserManagement.prototype.init = function(data){
		
		var _this = this;
		currentPage = 1;				

		for (var i = 0; i < _this.content.children.length; i++) {
			
			Elf.utils.remove(_this.content.children[i]);
		}
		$pTo( _this.moduleWarp , _this.content );			
		this.contTitle(data);
		this.creatGrid( data.result.baseList );
		this.pagesNumber(data.result.baseList );
		this.addHospital(data);
		
	}
	//生成title
	UserManagement.prototype.contTitle = function(data){
		
		var conTil,
			numbers,
			_this;
			
		_this = this;
		conTil = $creatE('div','wfull numberPeople pl6 relative');
		numbers = $creatE('span');
		numbers.innerHTML = '剩余名额：'+ data.result.baseNum;
		addrow = $creatE('button' , 'btn add-hospital prl12');
		addrow.innerHTML = '添加基地';
		$pTo( numbers , conTil );
		$pTo( addrow , conTil );
		$pTo( conTil , _this.moduleWarp );
	}
	
	//生成表格
	UserManagement.prototype.creatGrid = function( data ){
		
		var gridWarp,
			grid,
			_this;
		_this = this;	
		gridWarp = $creatE( 'div' , 'wfull tableWarp ptb10' );	//表格容器
		
		$pTo( gridWarp , _this.moduleWarp );
				
		this.grid = Elf.components.grid({
			cols:thData,
			data:data.slice( 0 , pageSize ),
			fullWidthRows:true,
			onCellSelected:function(evt,item,rowIndex,colIndex){

	    		var tt = evt.target;

	    		if( Elf.utils.hasClass(tt,"bianJi") ){

	    			_this.handle( evt , item ,data );
	    		}
	    		
	    		if(Elf.utils.hasClass(tt,"delete")){    //判断事件源是否是 删除 按钮
                	console.info(item);
           		}
			},
			target:gridWarp
		});

	}
	
	//分页工具
	UserManagement.prototype.pagesNumber = function( data ){
		
		var pageNumber ,paging ,_this;
			_this = this;
			pageNumber = $creatE('div','UM-grid-pageNumber ptb20');

	    	paging = Elf.components.paging({
	    		
		        total: data.length, //数据总数
		        currentPage: currentPage,   
		        pageSize:pageSize,       
		        maxPager:5,     //分页组件最多显示的页码数量结构
		        showStatus:false,    
		        statusFormat:"共 <b>{{total}}</b> 条记录 <b>{{totalPage}}</b> 页 当前第 <b>{{currentPage}}</b> 页", 
		        onPagerChange:function(p){ 
		            currentPage = p; 	
 					//更新数据
					Elf.components.grid.methods.update( _this.grid,data.slice((p-1)*pageSize,pageSize*p) );

		        }
		        
	    	});
	    
	    $pTo( paging , pageNumber );
		$pTo( pageNumber , _this.moduleWarp );
		
	}
	
	//表格编辑事件
	UserManagement.prototype.handle = function( ev , obj , data ){
			
		var dialog,
			dialogHtml,
			e,
			target,
			_this;
			
			_this = this;
			e = Elf.getEvent(ev);
			target = Elf.getEventSource(ev); 		
			dialogHtml = Elf.controls.createElement( 'div','wfull dialog-inner' );	
			console.log( obj );
			dialogHtml.innerHTML = '<div class="clear-both pt20" ><div class="fl hfull name prl6"  >基地名称 :  </div>	<div class="fr hfull text" > <input type="text" disabled="disabled" class="full prl6 area-name text" value='+ obj.fName  +' /> </div> </div><div class="clear-both pt20 relative" ><div class="fl hfull name prl6"  >密码 :  </div><div class="fr hfull text" ><input type="password" name="fPwd" class="full prl6 pass-word text" value='+  obj.fPwd  +'  /> </div><div class="tips prl10" >请输入密码 ! </div> </div><div class="clear-both pt20" ><div class="fl hfull name prl6"  >备注 :  </div><div class="fr hfull text" > <input type="text" class="full prl6 other-info text" value="'+ ( obj.fRemark ? obj.fRemark : '' ) +' " /> </div></div><div class="pt30 button-box" ><input class="btn saveData prl24 ptb6" type="button" value="确定"  /></div>';
			
			dialog = Elf.components.dialog({			
		        title:'',   
		        content: dialogHtml, 
		        dialogClass:'dialog-warp', 
		        width: 600,  
		        height: 400,
		        modal:true,  
	            target: _this.moduleWarp,  
		        onCloseDestroy:true,   
		        onClose:function(){		
		        			        	
		            console.log( "关闭弹框" );
		        }
				
			});	

			dialogHtml.addEventListener("click",function( ev ){
				
				var e,target,areaName,passWord,otherInfo,tips,returnData;
				
				e = Elf.getEvent(ev);
				tar = Elf.getEventSource(ev);
				areaName = this.getElementsByClassName('area-name')[0];
				passWord = this.getElementsByClassName('pass-word')[0];
				otherInfo = this.getElementsByClassName('other-info')[0];
				tips = this.getElementsByClassName('tips')[0];
				returnData = {};
				
				if( tar.nodeName === "INPUT" && Elf.utils.hasClass( tar , "text" ) && tar !== areaName  ){
					
					tar.value = '';
					
				} else if ( tar.nodeName === "INPUT" && Elf.utils.hasClass( tar , "saveData" ) ){
					
					if( Elf.utils.trim(passWord.value) === '' ){
						
						passWord.focus();
						tips.style.display = 'block';
						Elf.effects.show(tips , 2000 );
						
					} else {
	
						// 修改完成，返回数据 ,更新视图。
						// fId,fPwd,fRemark

						returnData.fId = obj.fId;
						returnData.fPwd = CryptoJS.MD5(passWord.value).toString();
						returnData.fRemark = otherInfo.value;
					
						obj.fRemark = otherInfo.value;

						
						//删除弹框
						Elf.utils.remove( dialog );							    								    
					    _this.moduleWarp.innerHTML = '';
//						Elf.components.grid.methods.update(_this.grid,data.slice( (currentPage-1)*pageSize , currentPage*pageSize));	

							
						function subEditBaseData( args ) {
						    var service = {
						        serviceModule: serviceInfo.serviceModule,
						        serviceNumber: '100040180',
						        token: use_info.token,
						        args: args
						    };
						    commonLogic.serviceCaller(service, function (data) {
						        //console.log(JSON.stringify(data));
						        //alert(data.flag);
						        if(data.flag == "true"){
						            //alert(data.result);
        						    Elf.components.toast({
								        holdtime:500,
								        text:'修改成功',
								        target:document.body
								    });	

								    //渲染数据
									getBaseData( _this );

						            console.log( data );
						           
						           if (data.result == 1) {
						            	
						            	console.log( data );
						                
						            }else {
//						                Elf.components.toast({text: data.error});
						            }
						        }else{
						            Elf.components.toast({text:data.error});
						        }
						    });
						}

						subEditBaseData(returnData);						
//						

					}				
					
				}
				
			});
		
		}	
	
	//添加基地
	UserManagement.prototype.addHospital = function(data){
		
		var html,
			str,
			selectHtml,
			diolog,
			data,
			addBtn,
			batchList,
			_this;
			
			_this = this;
			addBtn = this.moduleWarp.querySelector('.add-hospital');
			selectHtml = '';			
			batchList = data.result.batchList; 
			
			selectHtml = '<select class="fBatch full" name="fBatch" disabled="disabled" >';			
			for (var i = 0; i < batchList.length; i++) {
				
				if( batchList[i].fBatch == 2 ){
					selectHtml += '<option selected="selected" value="'+ batchList[i].fBatch +'" >第'+ batchList[i].fBatch +'批</option>';
				}
				
				selectHtml += '<option value="'+ batchList[i].fBatch +'" >第'+ batchList[i].fBatch +'批</option>';
				
			}
			selectHtml += '</select>';
			
			
			str = '<div class="clear-both pt20" ><div class="fl hfull name prl6"  >基地名称 :  </div> <div class="fr hfull text" > <input type="text" class="full prl6 area-name text" name="fName"  autocomplete="new-password" /> </div> </div><div class="clear-both pt20 relative" ><div class="fl hfull name prl6"  >密码 :  </div><div class="fr hfull text" ><input type="password" name="fPwd" class="full prl6 pass-word text" name="password" autocomplete="new-password" /> </div><div class="tips prl10" >请输入密码 ! </div> </div><div class="clear-both pt20" ><div class="fl hfull name prl6"  >备注 :  </div><div class="fr hfull text" > <input type="text" class="full prl6 other-info text" name="fRemark" /> </div></div><div class="clear-both pt20" ><div class="fl hfull name prl6"  >批次 :  </div><div class="fr hfull text" > '+ selectHtml +' </div></div><div class="pt30 button-box" ><input class="btn saveData prl24 ptb6" type="button" value="确定"  /></div>';
			
			
			addBtn.addEventListener('click',function(){
				
				html = Elf.controls.createElement( 'div','wfull dialog-inner' );
				html.innerHTML = str;
				
				if( data.result.baseNum == 0 ){
					
				    Elf.components.toast({
				        holdtime:1000,
				        text:'名额不足，无法添加！',
				        target:document.body
				    });					
					return
				}
				dialog = Elf.components.dialog({
					
			        title:'请填写基地信息',   
			        content: html, 
			        dialogClass:'dialog-warp', 
			        width: 600,  
			        height: 400,
			        modal:true,    //是否显示遮罩层
		            target: _this.moduleWarp,    // 弹框父级元素，如果不写默认为body
			        onCloseDestroy:true,   //关闭弹框时，是否删除弹框组件DOM元素   
			        onClose:function(){		//关闭弹框时触发的函数
			        			        	
			            console.log( "关闭弹框" );
			        }
					
				});
				
				dialog.addEventListener('click',function(ev){
					var e,
						target,
						hospitalName,
						pw,
						otherInfo,
						obj;
					obj = {};	
					e = Elf.getEvent(ev);
					target = Elf.getEventSource(ev);
					hospitalName = this.querySelector('input.area-name');
					pw = this.querySelector('input.pass-word');
					otherInfo = this.querySelector('input.other-info'); 
					
					if( Elf.utils.hasClass( target , 'saveData' ) ){
						
						if( Elf.utils.trim(hospitalName.value) === '' ){
							
						    Elf.components.toast({
						        width:200,
						        height:200,
						        holdtime:500,
						        text:'请输入基地名称！',
						        target:dialog
						    });
							
						}else if( Elf.utils.trim(pw.value) === '' ){
							
						    Elf.components.toast({
						        width:200,
						        height:200,
						        holdtime:500,
						        text:'请输入密码！',
						        target:dialog
						    });							
							
						}else{

							obj[hospitalName.name] = hospitalName.value;
							obj[pw.name] = CryptoJS.MD5(pw.value).toString();
							obj[otherInfo.name] = otherInfo.value;
							
							for (var i = 0; i < data.result.batchList.length; i++) {
								
								if( data.result.batchList[i].fBatch == 2 ){
									
									obj.fBatchId = data.result.batchList[i].fId;									
								
								}
								
							}
							
//							console.log( data ,obj );

							//删除弹框
							Elf.utils.remove( dialog );							    								    
						    _this.moduleWarp.innerHTML = '';
						    
							function subEditBaseData( args ) {
							    var service = {
							        serviceModule: serviceInfo.serviceModule,
							        serviceNumber: '100040070',
							        token: use_info.token,
							        args: args
							    };
							    commonLogic.serviceCaller(service, function (data) {
							        //console.log(JSON.stringify(data));
							        //alert(data.flag);
							        if(data.flag == "true"){
							            //alert(data.result);
							            Elf.components.toast({ type: "", opacity: 1, text: "保存成功"});										
									

//									    //渲染数据
										getBaseData( _this );
//										new zyjdModuleByGao.userManage;
										
							            if (data.result == 1) {
							            	
							                Elf.components.toast({text: data.error});					
							                
							            }else {

							                Elf.components.toast({text: data.error});
							            }
							            
							        }else{
							            Elf.components.toast({text:data.error});
							        }
							    });
							}

							subEditBaseData( obj );							

						}
						
						
					}
					
				});
				
			});
	}

})()

/***** 省级 > 申报材料审核 *****/
;(function(){
	
	var thData,
		$creatE,
		$pTo,
		currentPage,
		pageSize,
		result;
	
	thData = [
	
		{
			title:"序号",
			name:"",
			width:60,
			align:"center",
			fixedColumn:false,
			checkCol:false,
			valign:"middle",
			renderer:function(name,rowIndex,rowData){
				
				return rowIndex+1+ (currentPage-1)*pageSize;
			}
		}
		,{
			title:"批次",
			name:"",
			width:80,
			align:"center",
			fixedColumn:false,
			valign:"middle",
			renderer:function(name,rowIndex,rowData){
				var arr = ['第一批','第二批','第三批'];
				
				
				return "<div>"+ arr[parseInt(rowData.fBatch)-1] +"<div>";
	
			}
		}	
		,{
			title:"培训基地",
			name:"",
			width:100,
			align:"center",
			fixedColumn:false,
			valign:"middle",
			renderer:function(name,rowIndex,rowData){
				
				return rowData.fName;
			}
		}
		,{
			title:"培训基地申报况表<br />（上报报状态/审核状态）",
			name:"",
			width:100,
			align:"center",
			renderer:function(name,rowIndex,rowData){	 
				var arr1 = [ '未上报' ,'已上报'];
				var arr2 = [ '未审核' ,'已审核'];
				return "<div>"+ arr1[parseInt(rowData.fReportState)] + "/" + arr2[parseInt(rowData.fCheckState)] +"</div>";
				
			}
		}
		,{
			title:"专业基地申报况表 <br />（上报数量/审核数量）",
			name:"",
			width:100,
			align:"center",
			renderer:function(name,rowIndex,rowData){	
				
				var str = rowData.fBatch + rowData.fName;
				var data = result.departments[str] || {};			
				
				return "<div>"+ (data.reportSum || '0' + "/" + data.checkSum || '0' ) +"</div>";
				
			}
		}
		,{
			title:"协同基地申报况表 <br />（上报数量/审核数量）",
			name:"",
			width:100,
			align:"center",
			renderer:function(name,rowIndex,rowData){	
				
				var str = rowData.fBatch + rowData.fName;
				var data = result.cooperatives[str] ? result.cooperatives[str] : {};	
				
				return "<div>"+ ( (data.reportSum ? data.reportSum : 0) + "/" + (data.checkSum ? data.checkSum : 0) ) +"</div>";
				
			}
		}		
//		,{
//			title:"操作",
//			name:"",
//			width:120,
//			align:"center",
//			renderer:function(name,rowIndex,rowData){	    			
//				
//				return "<input type='button' class='bianJi prl12 btn line-h30' value='编辑' /><input type='button' class='delete prl12 btn line-h30' value='删除' />";
//				
//			}
//		}
	];
	
	currentPage = 1,
	pageSize = 20;
	    
	$creatE = Elf.controls.createElement;
	$pTo = Elf.controls.appendTo;
	
	//查询数据
	function getBaseData( _this ) {
	    var args = {};
	    args.fType = "5";
	    args.fProvince=use_info.province;
	    var service = {
	        serviceModule: serviceInfo.serviceModule,
	        serviceNumber: '100090190',
	        token: use_info.token,
	        args: args
	    };

	    commonLogic.serviceCaller(service, function (data) {
	        
	        //console.log(JSON.stringify(data));
	        if(data.flag == "true"){
	        	
	        	console.log( data );
	
				_this.init( data );
				

	        }else{
	        	
	            Elf.components.toast({text:data.error});
	        }
	    });
	}

	//发送数据
	function subEditBaseData( args , _this ) {
	    var service = {
	        serviceModule: serviceInfo.serviceModule,
	        serviceNumber: '100090090',
	        token: use_info.token,
	        args: args
	    };
	    commonLogic.serviceCaller(service, function (data) {
	        //console.log(JSON.stringify(data));
	        //alert(data.flag);
	        if(data.flag == "true"){
	            //alert(data.result);
			    Elf.components.toast({
			        holdtime:500,
			        text:'修改成功',
			        target:document.body
			    });	
			    
//			    //渲染数据
//				getBaseData( _this );
//	            console.log( data );
	           
	           if (data.result == 1) {
	            	
	            	console.log( data );
	                
	           }else {
	           	
	           	Elf.components.toast({text: data.error});
	            
	           }
	        }else{
	            Elf.components.toast({text:data.error});
	        }
	    });
	}	
	
	//查询功能请求数据
	function getsrerchData( obj ,_this ) {

	    var args = {};
	    args.fType = "5";
	    args.fProvince=use_info.province;
   		args.fName = obj.fName;
   		args.fBatch = obj.fBatch;
	    args.page = currentPage;
	    args.pageSize = pageSize;
	    var service = {
	        serviceModule: serviceInfo.serviceModule,
	        serviceNumber: '100090190',
	        token: use_info.token,
	        args: args
	    };

	    commonLogic.serviceCaller(service, function (data) {
	        
	        //console.log(JSON.stringify(data));
	        if(data.flag == "true"){
	        	
	        	console.log( data );
//
				Elf.components.grid.methods.update( _this.grid , data.result );
				

	        }else{
	        	
	            Elf.components.toast({text:data.error});
	        }
	    });
	}	
	
	//构造函数
	function MaterialReview(){
		
		this.content = document.querySelector(".elf_fiexd_center");
		this.warp = $creatE( 'div' , 'material-review prl10' );
		this.GridPagingWarp = $creatE( 'div' , 'wfull GridPagingWarp' );
		
		getBaseData( this );
		
	}
	zyjdModuleByGao.materialReview = MaterialReview;
	
	MaterialReview.prototype.init = function(data){
		var _this = this;
		currentPage = 1;
		this.content.innerHTML = '';
		$pTo( _this.warp , _this.content );	
		
		this.contTitle(data);
		this.creatGrid(data);
		this.pagesNumber(data);

	}
	
	//创建查询结构
	MaterialReview.prototype.contTitle = function(data){
		
		var queryWarp,
			findHospital,
			FilterHospital,
			batchHtml,
			batchStrArr,
			_this,
			data;
		data = data;
		_this = this;
		
		queryWarp = $creatE('div','wfull ptb10');
		conditionQuery = $creatE( 'div' , 'wfull train-base prl6 clear-fix' );	//	条件查询
		
		batchHtml = '';
		batchStrArr = ['第一批','第二批','第三批','第四批','第五批','第六批'];
		var batchList = data.result.batchList;
		
		for (var i = 0; i < batchList.length; i++) {
			
			batchHtml += '<option value="'+  batchList[i].fBatch +'">'+ batchStrArr[ batchList[i].fBatch -1 ] +'</option>';
		
		}		
		
		conditionQuery.innerHTML = '<div class="hfull pr20 inline-block" ><div class="inline-block prl10" >培训基地（医院）名称 : </div><div class="inline-block" ><input type="text" name="fName"  class="hospitalName prl5 ptb4 getvalue" /></div></div><div class="hfull pr20 inline-block" ><div class="inline-block prl10" > 批次 : </div><div class="inline-block"  ><select name="fBatch" class="pici getvalue" ><option class="pici" value="">请选择</option>'+ batchHtml +'</select></div></div><div class="hfull pr20 inline-block" ><button class="btn conditionQuery prl24 ptb6" value="查询" > 查询 </button></div>';
		
		//绑定事件
		conditionQuery.addEventListener('click' , function(ev){
			var has,
				e,
				tt,
				name,
				pici,
				infosObj;
				
			has = Elf.utils.hasClass;		
			e = Elf.getEvent(ev);
			tt = Elf.getEventSource(ev);
			hospitalName = this.querySelector('input.hospitalName');
			pici = this.querySelector('select.pici');
			infosObj = {};
			console.log( hospitalName , pici );
			
			if( has( tt , 'conditionQuery' ) ){
				
				if( Elf.utils.trim( hospitalName.value ) === '' && pici.value === '' ){
					
					Elf.components.toast({text:'请输入查询条件'});
					
				}else{
					
					infosObj[hospitalName.name] = hospitalName.value;
					infosObj[pici.name] = pici.value;
					
//					getsrerchData( infosObj ,_this );
				}

			}
			
		});
		
		$pTo( conditionQuery , queryWarp );	
		$pTo( queryWarp , _this.warp );
	}	
	
	//创建表格
	MaterialReview.prototype.creatGrid = function(data){
		
		var gridWarp,
			grid,
			_this;
		_this = this;	
		gridWarp = $creatE( 'div' , 'wfull tableWarp ptb10' );	//表格容器
		
		result = data.result;
		var dataArr = data.result.baseList;
		
		$pTo( gridWarp , _this.GridPagingWarp );
		$pTo( _this.GridPagingWarp , _this.warp );
		
		this.gridWarp = gridWarp;
		
		this.grid = Elf.components.grid({
			cols:thData,
			data:dataArr.slice( 0 , pageSize ),
			fullWidthRows:true,
			onCellSelected:function(evt,item,rowIndex,colIndex){

	    		var tt = evt.target;

	    		if( Elf.utils.hasClass(tt,"bianJi") ){

	    			_this.handle( evt , item ,data );
	    		}
	    		
	    		if(Elf.utils.hasClass(tt,"delete")){    //判断事件源是否是 删除 按钮
                	console.info(item);
           		}
			},
			target:gridWarp
		});		
		

	}
	
	//分页工具
	MaterialReview.prototype.pagesNumber = function( data ){
		
		var pageNumber ,paging ,_this,dataArr;
		
		_this = this;
		dataArr = data.result.baseList;
		
		this.pageNumber = $creatE('div','UM-grid-pageNumber ptb20');

    	paging = Elf.components.paging({
    		
	        total: dataArr.length, //数据总数
	        currentPage: currentPage,   
	        pageSize:pageSize,       
	        maxPager:5,     //分页组件最多显示的页码数量结构
	        showStatus:false,    
	        statusFormat:"共 <b>{{total}}</b> 条记录 <b>{{totalPage}}</b> 页 当前第 <b>{{currentPage}}</b> 页", 
	        onPagerChange:function(p){ 
	            currentPage = p; 		            

//				更新数据
//				Elf.components.grid.methods.update(_this.grid,data.slice((p-1)*pageSize,pageSize*p));

	        }
	        
    	});
	    	
    	this.pagingWarp = pageNumber;

	    $pTo( paging , _this.pageNumber  );
		$pTo( _this.pageNumber , _this.GridPagingWarp );
		
	}

})();

/*******省级> 省级材料上报 3*****/

;(function(){
	
	var $creatE,
		$pTo,
		$attr,
		gridHdata;
	
	$creatE = Elf.controls.createElement;
	$pTo = Elf.controls.appendTo;
	$attr = Elf.utils.attr;

	var data = {};
	data.result = {
		childrenList:[],
		parent:{
			
		}
	}

	//查询数据
	function getBaseData( _this ) {
	    var args = {};
	    args.fType = "5";
	    args.fTableNumber = "provinceDeclare";
	    var service = {
	        serviceModule: serviceInfo.serviceModule,
	        serviceNumber: '100090210',
	        token: use_info.token,
	        args: {"parent":args}
	    };

	    commonLogic.serviceCaller(service, function (data) {
	        
	        //console.log(JSON.stringify(data));
	        if(data.flag == "true"){
	        	console.log( data );
				_this.init( data );
				
	        }else{
	        	
	            Elf.components.toast({text:data.error});
	        }
	    });
	}	
	
	//发送数据
	function subEditBaseData( args , _this ) {
	    var service = {
	        serviceModule: serviceInfo.serviceModule,
	        serviceNumber: '100090220',
	        token: use_info.token,
	        args: args
	    };
	    console.log( args );
	    
	    commonLogic.serviceCaller(service, function (data) {
	        //console.log(JSON.stringify(data));

	        if(data.flag == "true"){
	            //alert(data.result);
			    Elf.components.toast({
			        holdtime:500,
			        text:'保存成功',
			        target:document.body
			    });	

	        }else{
	            Elf.components.toast({text:data.error});
	        }
	    });
	}	
	
	
	function ProvincialReported(){
		
		this.content = document.querySelector(".elf_fiexd_center");
		this.form = $creatE('form','full');
		this.warp = $creatE('div' ,'grid3 full');
		
		getBaseData( this );

//		this.init(data);
	}
	
	//省级材料上报附件3接口
	zyjdModuleByGao.provincialReported = ProvincialReported;
	
	//初始化
	ProvincialReported.prototype.init = function(data){
		console.log( data );
//		data.parent.fTableNumber = "provinceDeclare";
		
		console.log( data );
		
//		return
		this.creatGrid3(data);

	}
	
	//生成表格
	ProvincialReported.prototype.creatGrid3 = function(provinceData){
		
			var _this = this;
			
			Elf.components.ajax({
				
				url:"zyjd-provinceManage-file3.html",
				dataType:"html",
				data:{id:1,ccc:"ccc"},
				
				success:function(data){
					
					_this.warp.innerHTML = data;
					_this.content.innerHTML = '';
					Elf.controls.appendTo( _this.warp, _this.form);
					Elf.controls.appendTo( _this.form, _this.content);
					//请求数据
					_this.creatInfos( provinceData );

					_this.btnFn( provinceData );
//					_this.addHospital( provinceData );
//					_this.removeHospital( provinceData );					
					_this.hideBtns();
				},
				error:function(xhr){
					
					console.info(xhr);
				}
			});			
		
	}
	
	//btn事件
	ProvincialReported.prototype.btnFn = function( data ){
		var data = data;
		var dataList = data.childrenList;
		var that = this;
			
		this.warp.addEventListener('click' , function(ev){

			var has,
				e,
				tt,
				texts,
				allText,
				_this,
				argsObj,
					
			_this = this;	

			has = Elf.utils.hasClass;		
			e = Elf.getEvent(ev);
			tt = Elf.getEventSource(ev);
			allText = this.querySelectorAll('input.value');			

			if( has( tt , 'save-data' ) ){
				
				console.log('保存数据'); 
				
				argsObj = that.saveData(data);
				
				subEditBaseData( argsObj , _this );
				return
			}
			if( has( tt , 'submit-data' ) ){
				
				for (var i = 0; i < allText.length; i++) {
					
					if( Elf.utils.trim( allText[i].value) === '' ){
						
						allText[i].focus();						
					    Elf.components.toast({
					        width:200,
					        height:200,
					        holdtime:1000,
					        text:'请填写完整信息！',
					        opacity:1,
					        target:_this.content
					    });			
		
						return						
						
					}
				}
				
				console.log('上报数据'); 

				argsObj = that.saveData(data);
				
				subEditBaseData( argsObj , _this );
				return			
							
			}			
			
		})
	}
	
	//渲染数据
	ProvincialReported.prototype.creatInfos = function( data ){
		var str ='';
		
		var infosWarp = this.warp.getElementsByClassName('infos-warp')[0];	
		var lxr = this.warp.querySelector('.lxr');
		var mobileNum = this.warp.querySelector('.mobile-num');		
		
		var gridData = data.result;
		var hospitalData = gridData.list ? gridData.list : [];				
		var report = gridData.report || {};
		
		lxr.value = gridData.report.fContactPerson ? gridData.children.fContactPerson : '';
		mobileNum.value = gridData.fContactNumber ? gridData.fContactNumber : '';
		
		infosWarp.innerHTML = '';
		
		console.log( report ,hospitalData );

		for (var i = 0; i < hospitalData.length; i++) {

			var row = $creatE('div' , 'full h40 clear-fix rowData');
			Elf.utils.attr( row , 'data-index' , ( i + 1) ); 
			Elf.utils.attr( row , 'data-fId' , hospitalData[i].fId ); 

			var index = $creatE('div' , 'col-xs-1 ceils line-h40 hfull');			
			index.innerHTML = '<span>'+ (i + 1) +'</span>';			

			var name = $creatE('div' , 'col-xs-3 ceils line-h40 hfull');	

			name.innerHTML = '<input type="text" disabled="disabled" name="fName" value="'+ ( hospitalData[i].fName ? hospitalData[i].fName :"" ) +'" class="w180 text-info has-value" />';

			var qingKuang = $creatE('div' , 'col-xs-6 hfull');			
			qingKuang.innerHTML = '<div class="col-xs-4 hfull line-h40 ceils" ><input type="text" name="fCategory" disabled="disabled" value="'+ (hospitalData[i].fCategory ? hospitalData[i].fCategory : "") +'" class="full text-info  has-value" /></div><div class="col-xs-4 line-h40 hfull ceils" ><input type="text" disabled="disabled" name="fLevel" value="'+ (hospitalData[i].fLevel ? hospitalData[i].fLevel : "") +'" class="full text-info  has-value" /></div><div class="col-xs-4 hfull line-h40 ceils" ><input type="text" disabled="disabled" name="fType"  value="'+ (hospitalData[i].fType ? hospitalData[i].fType : "") +'" class="full text-info  has-value" /></div>';
			
			var peiXunLiang = $creatE('div' , 'col-xs-2 line-h40 hfull');
			peiXunLiang.innerHTML = '<div class="col-xs-12 hfull line-h40 ceils" ><input type="text" name="fCapacity" value="'+ ( hospitalData[i].fCapacity ? hospitalData[i].fCapacity : "" ) +'" class="w80 text-info value fCapacity" /></div>';
			
			$pTo( index , row );
			$pTo( name , row );
			$pTo( qingKuang , row );
			$pTo( peiXunLiang , row );
			$pTo( row , infosWarp );
			

		}
		
		var hasValue = this.warp.querySelectorAll('input.value');

		for (var i = 0; i < hasValue.length; i++) {
			
			console.log( hasValue[i].value );
			
			if( Elf.utils.trim( hasValue[i].value ) !== '' ){
				
				Elf.utils.addClass( hasValue[i] , "has-value" );
				 
			}else{
				
				Elf.utils.removeClass( hasValue[i] , "has-value" );
			}
			
			hasValue[i].addEventListener('blur',function(){
				
				if( Elf.utils.trim( this.value ) !== '' ){
					
					Elf.utils.addClass( this , "has-value" );
					 
				}else{
					
					Elf.utils.removeClass( this , "has-value" );
				}				
				
			})
		}
		
	}
	
	//隐藏按钮
	ProvincialReported.prototype.hideBtns = function(){
		var hash,
			btns,
			inputs;
			
		hash = window.location.hash.substring(1);	
		btns = this.warp.querySelectorAll('input.btn');
		inputs = this.warp.querySelectorAll('input');	
		
		if( hash.indexOf('newPage') !== -1 ){
							
			for (var i = 0; i < inputs.length; i++) {
				inputs[i].disabled = 'disabled';
			}			
			for (var i = 0; i < btns.length; i++) {
				
				Elf.effects.hidden(btns[i]);
			}			
		}
	
	}
	
	//添加基地
	ProvincialReported.prototype.addHospital = function(data){
		var _this,
			hospitalData,
			addBtn;


		_this = this;
		
		for (var i = 0; i < data.childrenList.length; i++) {
			
			if( data.childrenList[i].children.fOrder == 0 ){
				
				hospitalData = data.childrenList[i].grandsonList;				
			}
			
		}			
		
		addBtn = this.warp.querySelector('input.addrow');
		addBtn.addEventListener('click',function(){
			_this.saveData(data);
			
			if( hospitalData ){

				hospitalData.push( 					
					{
						"grandson":{}
					
					}
				);
				
			}else{
				
				hospitalData = [];
				data.hospitalData.push( 
					{
						"grandson":{}
					
					}
				);
			}

			console.log( data );
			_this.creatInfos(data);

						
		})
	
	}
	
	//删除基地
	ProvincialReported.prototype.removeHospital = function(data){
		var data = data,
		 	_this = this,
		 	hospitalData = null;
		
		for (var i = 0; i < data.childrenList.length; i++) {
			
			if( data.childrenList[i].children.fOrder == 0 ){
				
				hospitalData = data.childrenList[i].grandsonList;				
			}
			
		}
		
		this.warp.addEventListener('click', function(ev){

			var has,
				e,
				tt,
				parent,
				index;
			has = Elf.utils.hasClass;		
			e = Elf.getEvent(ev);
			tt = Elf.getEventSource(ev);
			
			if( has( tt , 'btn' ) && has( tt ,'removerow' ) ){
				
				while( !has( tt.parentNode , 'rowData' ) && tt.nodeName !== 'BODY' ){
					tt = tt.parentNode;
				}
				
				if( tt.nodeName === 'BODY' ){
					
					return
				}
				parent = tt.parentNode;
				index = Elf.utils.attr( parent , 'data-index');
			
				 Elf.utils.remove( parent );
				hospitalData[index-1].grandson.fIsDel = 1;
				console.log( hospitalData );

			}
			
		});
		
	}
	
	//本地保存数据
	ProvincialReported.prototype.saveData = function( data ){
		var data = data;
		var dataList = data.result.list;
		var warp = this.warp;
		var argsObj = {};
		var lxr,mobileNum,allText,rows,returnData; 

		lxr = warp.querySelector('.lxr');		
		mobileNum = warp.querySelector('.mobile-num');
		rows = warp.getElementsByClassName('rowData');		
		
		argsObj.report = {};
		argsObj.report.fContactPerson = lxr.value;
		argsObj.report.fContactNumber = mobileNum.value;
		argsObj.report.fReportState = data.result.report.fReportState || "";

		argsObj.capacity = [];
		
		for (var i = 0; i < rows.length; i++) {
			argsObj.capacity[i] = {};
			argsObj.capacity[i].fId = rows[i].dataset.fid;
			capacitys = rows[i].querySelector('.fCapacity');
			argsObj.capacity[i].fCapacity = capacitys.value;

		}		
		
		console.log( argsObj );
		return argsObj;
	}
	
})()

