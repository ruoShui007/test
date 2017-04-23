/*
 ****中医基地-省级用户模块
****time：2017-4-2 
****author:gaopengfei
*****省级 > 申报材料审核模块******
*/

/*--**** 省级> 申报材料审核 > 培训基地审核页面****--*/
;(function(){
	
	var $creatE,
		$pTo,
		gridHdata,
		currentPage,
		pageSize;
		
	currentPage = 1,
	pageSize = 1;	
	$creatE = Elf.controls.createElement;
	$pTo = Elf.controls.appendTo;	
	
	//配置表头数据
 	gridHdata = [
	
		{
			title:"编号",
			name:"",
			width:48,
			align:"center",
			fixedColumn:true,
			checkCol:true,
			valign:"middle",
			renderer:function(name,rowIndex,rowData){
				return '<div class="fixedCell">'+ (rowIndex+1) +'</div>';
			}
		},
		{
			title:"审核状态",
			name:"",
			width:48,
			align:"center",
			fixedColumn:false,
			checkCol:false,
			valign:"middle",
			renderer:function(name,rowIndex,rowData){
			
				var str = '';
				if(rowData.fCheckState == 1){
					
					str = '已通过';
					
				}else if(rowData.fCheckState == 0){
					
					str = '未通过';
				}
				
				return str;
			}
		}
		,{
			title:"修改状态",
			name:"",
			width:100,
			align:"center",
			fixedColumn:false,
			valign:"middle",
			renderer:function(name,rowIndex,rowData){

			var str1 = '',
				str2 = '';
			
			if( rowData.fEditableState == 1 ){
				
				str1 = 'checked="checked" ';
				str2 = '';
			}
			if( rowData.fEditableState == 0 ){
				
				str2 = 'checked="checked" ';
				str1 = '';
			}	
				return '<label><input class="fEditable1" name="zt'+ rowIndex +'" type="radio" '+  str1 +' />可修改</label><label><input class="fEditable0" name="zt'+ rowIndex +'" type="radio"  '+  str2 +'  />不可修改 </label>' ;
			}
		}
		,{
			title:"培训基地（医院）名称",
			name:"",
			width:100,
			align:"center",
			fixedColumn:false,
			valign:"middle",
			renderer:function(name,rowIndex,rowData){
			
	
				return "<div>"+ (rowData.fName ? rowData.fName : '') +"</div>";
	
			}
		}
		,{
			title:"联系人",
			name:"",
			width:60,
			align:"center",
			renderer:function(name,rowIndex,rowData){	    			
				
				return "<div>"+ (rowData.fContactPerson? rowData.fContactPerson :'') +"</div>";
				
			}	    		
			
		}
		
		,{
			title:"联系电话",
			name:"",
			width:80,
			align:"center",
			renderer:function(name,rowIndex,rowData){	    			
				
				return "<div>"+ ( rowData.fContactNumber? rowData.fContactNumber :'' ) +"</div>";
				
			}	    		
			
		}
		
		,{
			title:"基地申报表",
			name:"",
			width:100,
			align:"center",
			renderer:function(name,rowIndex,rowData){	    			
				
				var str = "<a class='open-grid2 prl12' target='_blank' href='javascript:;'>表2</a><a class='open-grid3 prl12' target='_blank' href='javascript:;'>表3</a>";
				return str;
				
			}	    		
			
		}	    	
		,{
			title:"上报时间",
			name:"",
			width:80,
			align:"center",
			renderer:function(name,rowIndex,rowData){	    			
				
				return "<div>"+ (rowData.startTime ? rowData.startTime : '') + "</div>";
				
			}
		}
	
	];

	//查询数据
	function getBaseData( _this ) {
		currentPage = 1;
	    var args = {};
	    args.fType = "5";
	    args.fProvince=use_info.province;
	    args.page = currentPage;
	    args.pageSize = pageSize;	    
	    var service = {
	        serviceModule: serviceInfo.serviceModule,
	        serviceNumber: '100090130',
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

	//返回数据						
	function subEditBaseData( args ) {
	    var service = {
	        serviceModule: serviceInfo.serviceModule,
	        serviceNumber: '100090130',
	        token: use_info.token,
	        args: args
	    };
	    commonLogic.serviceCaller(service, function (data) {
	        //console.log(JSON.stringify(data));
	        //alert(data.flag);
	        if(data.flag == "true"){

			    //渲染数据
//				getBaseData( _this );

	          
	        }else{
	            Elf.components.toast({text:data.error});
	        }
	    });
	}

	//返回修改状态
	function subEditable( args ) {
	    var service = {
	        serviceModule: serviceInfo.serviceModule,
	        serviceNumber: '100090180',
	        token: use_info.token,
	        args: args
	    };
	    commonLogic.serviceCaller(service, function (data) {
	        //console.log(JSON.stringify(data));
	        //alert(data.flag);
	        if(data.flag == "true"){
	          
	        }else{
	            Elf.components.toast({text:data.error});
	        }
	    });
	}	

	//返回审核状态
	function subCheckState( args , _this ) {
	    var service = {
	        serviceModule: serviceInfo.serviceModule,
	        serviceNumber: '100090160',
	        token: use_info.token,
	        args: args
	    };
	    commonLogic.serviceCaller(service, function (data) {
	        //console.log(JSON.stringify(data));
	        //alert(data.flag);
	        if(data.flag == "true"){
	        	
	        	Elf.components.toast({text:'审核成功',holdtime:600});	        	
				updateGrid( _this );

	          
	        }else{
	            Elf.components.toast({text:data.error});
	        }
	    });
	}

	//请求分页数据
	function getPageData( _this ) {
	    var args = {};
	    args.fType = "5";
	    args.fProvince=use_info.province;
	    args.page = currentPage;
	    args.pageSize = pageSize;
	    var service = {
	        serviceModule: serviceInfo.serviceModule,
	        serviceNumber: '100090140',
	        token: use_info.token,
	        args: args
	    };
		console.log( args );
	    commonLogic.serviceCaller(service, function (data) {
	        
	        //console.log(JSON.stringify(data));
	        if(data.flag == "true"){
	        	
	        	console.log( data.result );
	
				Elf.components.grid.methods.update( _this.grid , data.result.result );

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
   		args.fCheckState = obj.fCheckState;
	    args.page = currentPage;
	    args.pageSize = pageSize;
	    var service = {
	        serviceModule: serviceInfo.serviceModule,
	        serviceNumber: '100090130',
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

	//更新表格数据
	function updateGrid( _this ){

	    var args = {};
	    args.fType = "5";
	    args.fProvince=use_info.province;
	    args.page = currentPage;
	    args.pageSize = pageSize;	    
	    var service = {
	        serviceModule: serviceInfo.serviceModule,
	        serviceNumber: '100090130',
	        token: use_info.token,
	        args: args
	    };

	    commonLogic.serviceCaller(service, function (data) {
	        
	        //console.log(JSON.stringify(data));
	        if(data.flag == "true"){
	        	
	        	console.log( data );
				Elf.components.grid.methods.update( _this.grid , data.result.result );
				

	        }else{
	        	
	            Elf.components.toast({text:data.error});
	        }
	    });		
		
	}

	function TrainingBase(){

		//页面容器	
		this.content = document.querySelector(".elf_fiexd_center");
		this.warp = $creatE('div','training-base-warp full p10');
		
		//ajax请求数据，成功后执行init函数，把数据传入init
		getBaseData( this );

		
	};
	
	//暴露接口
	zyjdModuleByGao.trainBase = TrainingBase;	
	
	TrainingBase.prototype.init = function ( data ){
		var _this = this; 

		_this.content.innerHTML = '';
		$pTo( _this.warp , _this.content );

		this.query(data);
		this.creatGrid(data);
		this.pageNumber( data );
		
		
	}
	
	//查询结构
	TrainingBase.prototype.query = function( data ){
		var queryWarp,
			findHospital,
			FilterHospital,
			_this,
			batchHtml,
			batchStrArr;
		
		_this = this;
		batchHtml = '';
		batchStrArr = ['第一批','第二批','第三批','第四批','第五批','第六批'];
		queryWarp = $creatE('div','wfull');
		conditionQuery = $creatE( 'div' , 'wfull train-base prl6' );	//	条件查询
		batchSelection = $creatE( 'div' , 'wfull check-hospital ptb12 prl6' );	//批量选择
		
		var batchList = data.result.batchList;
		for (var i = 0; i < batchList.length; i++) {
			
			batchHtml += '<option value="'+  batchList[i].fBatch +'">'+ batchStrArr[ batchList[i].fBatch -1 ] +'</option>';
		
		}
			
		
		conditionQuery.innerHTML = '<div class="hfull pr20" > <div>培训基地（医院）名称 : </div><div><input type="text" name="fName" class="hospitalName prl5 ptb4 getvalue" /></div></div> <div class="hfull pr20" ><div class="" > 批次 : </div><div class="" ><select name="fBatch" class="pici getvalue" ><option value="">请选择</option>'+ batchHtml +'</select></div></div> <div class="hfull pr20" ><div class="" > 审核状态 : </div><div class="" ><select name="fCheckState" class="zhuangtai getvalue" ><option value="">请选择</option><option value="1">审核通过</option><option value="0">审核不通过</option></select></div></div> <div class="hfull pr20" ><button class="btn conditionQuery prl24 ptb6" value="查询" > 查询 </button></div>';
		
		batchSelection.innerHTML = '<div class="pr20 hfull" ><div class="prl6 hfull" ><span >审核 :</span></div></div><div class="pr20 hfull" ><input class="prl8 ptb4 success btn"  type="button" value="审核通过" /><input class="prl8 ptb4 un-success btn"  type="button" value="审核不通过" /></div>';
		
		//绑定事件
		conditionQuery.addEventListener('click' , function(ev){
			
			_this.conditionQueryFn.call( conditionQuery , ev , _this ); 
			
		});
		batchSelection.addEventListener('click', function(ev){
			
			_this.batchSelectionFn.call( batchSelection , ev , _this ); 
			
		});
		
		$pTo( conditionQuery , queryWarp );
		$pTo( batchSelection , queryWarp );		
		$pTo( queryWarp , _this.warp );

	}
	
	// 创建表格
	TrainingBase.prototype.creatGrid = function( data ){
		
		var gridWarp,
			_this = this;
		var dataArr = data.result.result ? data.result.result : [] ;

		gridWarp = $creatE( 'div','wfull JD-grid-page' );
		this.gridWarp = gridWarp;
		$pTo( gridWarp , _this.warp );

		this.grid = Elf.components.grid({
			
			cols:gridHdata,
			data:dataArr.slice( 0 , pageSize ),
			fullWidthRows:true,
			onCellSelected:function(evt,item,rowIndex,colIndex){

	    		var tt = evt.target;
	
	    		if( Elf.utils.hasClass(tt,"open-grid2") ){
	    			
	    			console.log( item );
	    					window.open("declareTable.html?token="+use_info.token+"&type=2"+"&fBatchInfoId="+item.fBatchInfoId );
	    			
	    			return
	    		}
	    		
	    		if( Elf.utils.hasClass(tt,"open-grid3") ){
	    			
					window.open("declareTable.html?token="+use_info.token+"&type=3"+"&fBatchInfoId="+item.fBatchInfoId );
	    			return
	    		}

	    		if( Elf.utils.hasClass(tt,"fEditable1") ){

					var obj = {};
					obj.fId = item.fId;
					obj.fEditable = 1;
					subEditable( obj );
	    			return
	    		}
	    		
	    		if( Elf.utils.hasClass(tt,"fEditable0") ){
	    			

					var obj = {};
					obj.fId = item.fId;
					obj.fEditable = 0;					
					subEditable( obj );

	    			return
	    		}	    		
	    		
			},
			target:gridWarp
		});

	}

	// 分页组件
	TrainingBase.prototype.pageNumber = function ( data ){
		
		var JDpageNumber ,paging ,_this;
			_this = this;
			JDpageNumber = $creatE('div','JD-grid-pageNumber ptb20');
			this.pagingWarp = JDpageNumber;
			
	    	paging = Elf.components.paging({
	    		
		        total: data.total, //数据总数
		        currentPage: currentPage,   
		        pageSize:pageSize,       
		        maxPager:5,     //分页组件最多显示的页码数量结构
		        showStatus:false,    
		        statusFormat:"共 <b>{{total}}</b> 条记录 <b>{{totalPage}}</b> 页 当前第 <b>{{currentPage}}</b> 页", 
		        onPagerChange:function(p){  //页码跳转函数 ， 函数有一个参数，就是当前点击的按钮对应的页码
		            
		            currentPage = p;
 					
 					//更新数据
					getPageData( _this );	

		        }
		        
	    	});
	  	    
	    $pTo( paging , JDpageNumber );
		$pTo( JDpageNumber , _this.warp);	
	}
	
	//条件查询
	TrainingBase.prototype.conditionQueryFn = function( ev , _this ){
		var e,
			tt,
			has,
			infos,
			infosObj,
			has,
			hosptialName;
		
		infosObj = {};
		has = Elf.utils.hasClass;		
		e = Elf.getEvent(ev);
		tt = Elf.getEventSource(ev);
		
//		Elf.components.toast({text:'功能暂缓开通'});		
//		return;
		
		hosptialName = this.getElementsByClassName('hospitalName')[0];

		if( has( tt , 'conditionQuery') ){			
			
			if( Elf.utils.trim( hosptialName.value ) === '' ){
				
				hosptialName.focus();
				
				console.log('请填医院名称');
				
				return
			}
			
			infos = this.getElementsByClassName('getvalue');
			
			for (var i = 0; i < infos.length; i++) {
				
				infosObj[infos[i].name] = infos[i].value;
			}
			console.log( infosObj );
			//请求数据，更新视图
//			return
			getsrerchData( infosObj ,_this );

//			Elf.components.grid.methods.update( _this.grid,data.slice(0 ,pageSize) );	
			
		}

	}
	
	//审核
	TrainingBase.prototype.batchSelectionFn = function(ev , _this ){
	
		var e,
		tt,
		has,
		infos,
		checkObj,
		checkArr,
		obj;

		has = Elf.utils.hasClass;		
		e = Elf.getEvent(ev);
		tt = Elf.getEventSource(ev);
		checkArr = [];
		obj = {};
		if( has( tt , 'success') ){

			console.log( '审核通过' );	
			
			checkObj = Elf.components.grid.methods.getCheckedData( _this.grid );

			if( Elf.utils.isEmptyObject( checkObj ) ){
				
			    Elf.components.toast({text:'没有选中数据',holdtime:800});
				return
			}
			
		    Elf.utils.each(checkObj ,function(index , item){ 
		    	
		    	checkArr[index] = item.fId;
		    
		    });
			
			obj.ids = checkArr;
			obj.fCheckState = 1;
			
			subCheckState( obj , _this );
			return;

		}
		
		if( has( tt , 'un-success') ){
			
			console.log( '审核未通过' );	
			checkObj = Elf.components.grid.methods.getCheckedData( _this.grid );

			if( Elf.utils.isEmptyObject( checkObj ) ){
				
			    Elf.components.toast({text:'没有选中数据',holdtime:800});
				return
			}
			
		    Elf.utils.each(checkObj ,function(index , item){ 
		    	
		    	checkArr[index] = item.fId;
		    
		    });
			
			obj.ids = checkArr;
			obj.fCheckState = 0;	
			
			subCheckState( obj , _this );			
			return
		}		
		
	}
	

})()


/*--*****省级> 申报材料审核 > 专业科室审核模块*****--*/	
;(function(){
	
	var $creatE,
		$ap,
		gridHdata,
		currentPage,
		pageSize,
		dataResult;
		
	currentPage = 1,
	pageSize = 10;			
	$creatE = Elf.controls.createElement;
	$pTo = Elf.controls.appendTo;		

	gridHdata = [

    	{
    		title:"编号",
		name:"",
		width:48,
		align:"center",
		fixedColumn:true,
		checkCol:true,
		valign:"middle",
		renderer:function(name,rowIndex,rowData){
			
			return '<div class="fixedCell">'+ (rowIndex+1) +'</div>';
		}
	},
	{
		title:"审核状态",
		name:"",
		width:48,
		align:"center",
		fixedColumn:false,
		checkCol:false,
		valign:"middle",
		renderer:function(name,rowIndex,rowData){
			
			var str = '';
			if(rowData.fCheckState == 1){
				
				str = '已通过';
				
			}else if(rowData.fCheckState == 0){
				
				str = '未通过';
			}
			
			return str;
		}
	}
	,{
		title:"修改状态",
		name:"",
		width:100,
		align:"center",
		fixedColumn:false,
		valign:"middle",
		renderer:function(name,rowIndex,rowData){

			var str1 = '',
				str2 = '';
			
			if( rowData.fEditableState == 1 ){
				
				str1 = 'checked="checked" ';
				str2 = '';
			}
			if( rowData.fEditableState == 0 ){
				
				str2 = 'checked="checked" ';
				str1 = '';
			}			

			return '<label><input class="fEditable1" name="zt'+ rowIndex +'" type="radio" '+  str1 +' />可修改</label><label><input class="fEditable0" name="zt'+ rowIndex +'" type="radio"  '+  str2 +'  />不可修改 </label>' ;
		}
	}
	,{
		title:"培训基地（医院）名称",
		name:"",
		width:100,
		align:"center",
		fixedColumn:false,
		valign:"middle",
		renderer:function(name,rowIndex,rowData){
		

			return "<span>"+( rowData.baseName ? rowData.baseName : '' )+"</span>";

		}
	}
	
	,{
		title:"专业基地（科室）",
		name:"",
		width:100,
		align:"center",
		renderer:function(name,rowIndex,rowData){	    			
			
			var str = "<a class='department'  href='javascript:;'>"+( staticData.subjectData[rowData.fDepartmentCode] ? staticData.subjectData[rowData.fDepartmentCode] : ''  )+"</a>";
			return str;
			
		}
	}
	,{
		title:"协同单位",
		name:"",
		width:100,
		align:"center",
		renderer:function(name,rowIndex,rowData){
			var xtdw = "";

			var arr = dataResult[rowData.baseName] ? dataResult[rowData.baseName] : [];
			
			for (var i = 0; i <  arr.length; i++) {
				
				xtdw += "<a href='javascript:;' class='units' data-fBatchInfoId='"+ arr[i].fBatchInfoId +"'  data-fDepartmentCode='"+ arr[i].fDepartmentCode +"' data-fChildrenId='"+ arr[i].fChildrenId +"' >"+ arr[i].fName + "-"+ staticData.subjectData[ arr[i].fCode ] +"</a><br/>";
				
			}
			
			var str = "<div class='department' >" + xtdw + "</div>";
			return str;
			
		}
	}
	,{
		title:"上报时间",
		name:"",
		width:80,
		align:"center",
		renderer:function(name,rowIndex,rowData){	    			
			
			return rowData.startTime?rowData.startTime:'';
			
		}
	}

];	
	    
	//初始请求数据
	function getBaseData( _this ) {
		currentPage = 1;
	    var args = {};
	    args.fType = "5";
	    args.fProvince=use_info.province;
	    args.page = currentPage;
	    args.pageSize = pageSize;
	    var service = {
	        serviceModule: serviceInfo.serviceModule,
	        serviceNumber: '100090140',
	        token: use_info.token,
	        args: args
	    };
		console.log( args );
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
	
	//返回修改状态
	function subEditable( args ) {
	    var service = {
	        serviceModule: serviceInfo.serviceModule,
	        serviceNumber: '100090180',
	        token: use_info.token,
	        args: args
	    };
	    commonLogic.serviceCaller(service, function (data) {
	        //console.log(JSON.stringify(data));
	        //alert(data.flag);
	        if(data.flag == "true"){
	          
	          Elf.components.toast({text:'修改成功',holdtime:600});
	          
	        }else{
	            Elf.components.toast({text:data.error});
	        }
	    });
	}	

	//返回审核状态
	function subCheckState( args , _this ) {
	    var service = {
	        serviceModule: serviceInfo.serviceModule,
	        serviceNumber: '100090160',
	        token: use_info.token,
	        args: args
	    };
	    commonLogic.serviceCaller(service, function (data) {
	        //console.log(JSON.stringify(data));
	        //alert(data.flag);
	        if(data.flag == "true"){
	        	
	        	Elf.components.toast({text:'审核成功',holdtime:600});	        	
				
				updateGrid( _this );
	          
	        }else{
	            Elf.components.toast({text:data.error});
	        }
	    });
	}	

	//请求分页数据
	function getPageData( _this ) {
	    var args = {};
	    args.fType = "5";
	    args.fProvince=use_info.province;
	    args.page = currentPage;
	    args.pageSize = pageSize;
	    var service = {
	        serviceModule: serviceInfo.serviceModule,
	        serviceNumber: '100090140',
	        token: use_info.token,
	        args: args
	    };
		console.log( args );
	    commonLogic.serviceCaller(service, function (data) {
	        
	        //console.log(JSON.stringify(data));
	        if(data.flag == "true"){
	        	
	        	console.log( data );	
				Elf.components.grid.methods.update(_this.grid , data.result );

	        }else{
	        	
	            Elf.components.toast({text:data.error});
	        }
	    });
	}	

	//查询返回数据
	function getQueryData( args , _this ) {
	    args.page = currentPage;
	    args.pageSize = pageSize;	
	    var service = {
	        serviceModule: serviceInfo.serviceModule,
	        serviceNumber: '100090140',
	        token: use_info.token,
	        args: args
	    };
		console.log( args );
	    commonLogic.serviceCaller(service, function (data) {
	        
	        //console.log(JSON.stringify(data));
	        if(data.flag == "true"){
	        	
	        	console.log( data );
	        	dataResult = data.result;
				Elf.components.grid.methods.update(_this.grid , data.result.result );
	        }else{
	        	
	            Elf.components.toast({text:data.error});
	        }
	    });
	}	

	//更新表格数据
	function updateGrid( _this ){

	    var args = {};
	    args.fType = "5";
	    args.fProvince=use_info.province;
	    args.page = currentPage;
	    args.pageSize = pageSize;	    
	    var service = {
	        serviceModule: serviceInfo.serviceModule,
	        serviceNumber: '100090140',
	        token: use_info.token,
	        args: args
	    };

	    commonLogic.serviceCaller(service, function (data) {
	        
	        //console.log(JSON.stringify(data));
	        if(data.flag == "true"){
	        	
	        	console.log( data );
	        	dataResult = data.result;
				Elf.components.grid.methods.update( _this.grid , data.result.result );
				

	        }else{
	        	
	            Elf.components.toast({text:data.error});
	        }
	    });		
		
	}



	function SpecialDepartment(){
		
		//页面容器	
		this.content = document.querySelector(".elf_fiexd_center");
		this.warp = $creatE('div','training-base-warp full p10');	
		
		getBaseData(this);		
		
	}	
	//专业科室审核函数接口
	zyjdModuleByGao.specialDepartment = SpecialDepartment;
	
	SpecialDepartment.prototype.init = function(data){
		

		var _this = this; 
		dataResult = data.result.departments;
		_this.content.innerHTML = '';
		$pTo( _this.warp , _this.content );
		
		this.query();
		this.creatGrid(data);
		this.pageNumber( data );
	
	}
	
	// 创建搜索栏
	SpecialDepartment.prototype.query = function(){
		var queryWarp,
			findHospital,
			FilterHospital,
			allDepartment,
			batchStrArr,
			batchHtml,
			_this;
		
		_this = this;
		
		queryWarp = $creatE('div','wfull');
		conditionQuery = $creatE( 'div' , 'wfull train-base prl6' );	//	条件查询
		batchSelection = $creatE( 'div' , 'wfull check-hospital ptb12 prl6' );	//批量选择
		
		allDepartment = '';
		batchHtml = '';
		batchStrArr = ['第一批','第二批','第三批','第四批','第五批','第六批'];
		var batchList = data.result.batchList;
		for (var i = 0; i < batchList.length; i++) {
			
			batchHtml += '<option value="'+  batchList[i].fBatch +'">'+ batchStrArr[ batchList[i].fBatch -1 ] +'</option>';
		
		}		
		
		for (var i = 1; i < 22; i++) {
			allDepartment += '<option value="'+ i +'">'+ staticData.subjectData[i] +'</option>';
		}	
		conditionQuery.innerHTML = '<div class="hfull pr20" ><div>培训基地（医院）名称 : </div><div><input type="text" class="hospitalName getvalue prl5 ptb4" name="fName" /></div></div><div class="hfull pr20" ><div class="" > 审核状态 : </div><div class="" ><select name="fCheckState" class="zhuangtai getvalue" ><option value="">请选择</option><option value="1">审核通过</option><option value="0">审核未通过</option></select></div></div>	<div class="hfull pr20" ><div class="" > 专业基地(科室) : </div><div class="" ><select name="fDepartmentCode" class="pici getvalue" ><option value="">请选择</option>'+ allDepartment +'</select></div></div><div class="hfull pr20" ><div class="" > 批次 : </div><div class="" ><select name="fBatch" class="pici getvalue" ><option value="">请选择</option>'+ batchHtml +'</select></div></div><div class="hfull pr20" ><button class="btn conditionQuery prl24 ptb6" value="查询" > 查询 </button></div>';
		
		batchSelection.innerHTML = '<div class="pr20 hfull" ><div class="prl6 hfull" ><span >审核 :</span></div></div><div class="pr20 hfull" ><input class="prl8 ptb4 success btn"  type="button" value="审核通过" /><input class="prl8 ptb4 un-success btn"  type="button" value="审核不通过" /></div>';
		
//		//绑定事件
		conditionQuery.addEventListener('click' , function(ev){
			
			_this.conditionQueryFn.call( conditionQuery , ev , _this );
			
		} );
		batchSelection.addEventListener('click', function(ev){
			
			_this.batchSelectionFn.call( batchSelection , ev , _this );
			
		} );
		
		$pTo( conditionQuery , queryWarp );
		$pTo( batchSelection , queryWarp );		
		$pTo( queryWarp , _this.warp );

	}
		
	// 创建表格
	SpecialDepartment.prototype.creatGrid = function( data ){
		
		var gridWarp,
			_this = this,
			dataArr;
		dataArr = data.result.result;
		gridWarp = $creatE( 'div','wfull JD-grid-page' );
		this.gridWarp = gridWarp;
		$pTo( gridWarp , _this.warp );
	
		this.grid = Elf.components.grid({
			
			cols:gridHdata,
			data:dataArr.slice( 0 , pageSize ),
			fullWidthRows:true,
			onCellSelected:function(evt,item,rowIndex,colIndex){

	    		var tt = evt.target;

	    		if( Elf.utils.hasClass(tt,"fEditable1") ){
	    			
					var obj = {};
					obj.fId = item.fId;
					obj.fEditable = 1;
					subEditable( obj );
	    			console.log(obj);
	    			return
	    		}
	    		
	    		if( Elf.utils.hasClass(tt,"fEditable0") ){
	    			

					var obj = {};
					obj.fId = item.fId;
					obj.fEditable = 0;					
					subEditable( obj );

	    			return
	    		}
	    		
	    		if( Elf.utils.hasClass(tt,"department") ){	    			
	    					window.open("declareTable.html?token="+use_info.token+"&type=department4"+"&fBatchInfoId="+item.fBatchInfoId+"&fDepartmentCode=" + item.fDepartmentCode );				
	    			return		
	    		}
	    		
	    		if( Elf.utils.hasClass(tt,"units") ){
	    			
	    			var obj = tt.dataset;
	    			
					window.open("declareTable.html?token="+use_info.token+"&type=units4"+"&fBatchInfoId="+obj.fBatchInfoId+"&fDepartmentCode=" + obj.fDepartmentCode + "&fChildrenId=" +obj.fChildrenId );				
	    			return		
	    		}	    		
	    		
			},
			target:gridWarp
		});
		
	}
	
	// 分页组件
	SpecialDepartment.prototype.pageNumber = function ( data ){
		
		var JDpageNumber ,paging ,_this;
			_this = this;
			JDpageNumber = $creatE('div','JD-grid-pageNumber ptb20');
			this.pagingWarp = JDpageNumber;
			
	    	paging = Elf.components.paging({
	    		
		        total: data.total, //数据总数
		        currentPage: currentPage,   
		        pageSize:pageSize,       
		        maxPager:5,     //分页组件最多显示的页码数量结构
		        showStatus:false,    
		        statusFormat:"共 <b>{{total}}</b> 条记录 <b>{{totalPage}}</b> 页 当前第 <b>{{currentPage}}</b> 页", 
		        onPagerChange:function(p){  //页码跳转函数 ， 函数有一个参数，就是当前点击的按钮对应的页码
		            
		            currentPage = p;
 					
 					//更新数据
					getPageData( _this );	

		        }
		        
	    	});
	    
	    $pTo( paging , JDpageNumber );
		$pTo( JDpageNumber , _this.warp);	
	}
	
	//条件查询
	SpecialDepartment.prototype.conditionQueryFn = function( ev , _this ){
		var e,
			tt,
			has,
			hospital,
			infos,
			objArg;
			
		has = Elf.utils.hasClass;		
		e = Elf.getEvent(ev);
		tt = Elf.getEventSource(ev);
		
		hospital = this.getElementsByClassName('hospitalName')[0];
		infos = this.getElementsByClassName('getvalue');		
		objArg = {};
		var hasValue = false;
		if( has( tt , 'conditionQuery') ){
			
			for (var i = 0; i < infos.length; i++) {
				
				if( infos[i].value !== '' ){
					
					hasValue = true;
				}
				
			}

			if( !hasValue ){

				Elf.components.toast({text:'请选择条件'});
				
				return				
				
			}else{
				
				objArg.fName = hospital.value;

				for (var i = 0; i < infos.length; i++) {
					
					objArg[infos[i].name] = infos[i].value;
				}
				
				console.log( objArg );
				getQueryData( objArg , _this );
			
			}
			
		
			
		}

	}
	
	//审核
	SpecialDepartment.prototype.batchSelectionFn = function(ev , _this ){
	
		var e,
		tt,
		has,
		infos,
		checkState,
		checkArr,
		obj;

		has = Elf.utils.hasClass;		
		e = Elf.getEvent(ev);
		tt = Elf.getEventSource(ev);
		obj = {};	
		checkArr = [];	
		
		if( has( tt , 'success') ){

			console.log('审核通过的医院查找中...');

			checkState = Elf.components.grid.methods.getCheckedData(_this.grid);
			
			if( Elf.utils.isEmptyObject( checkState ) ){
				
			    Elf.components.toast({text:'没有选中数据',holdtime:600});
				return
			}
			
		    Elf.utils.each(checkState ,function(index , item){ 
		    	
		    	checkArr[index] = item.fId;
		    
		    });
			
			obj.ids = checkArr;
			obj.fCheckState = 1;
			console.log( obj );		
			
			subCheckState( obj , _this );			
			
			return
			//请求数据
			Elf.utils.remove( _this.gridWarp ); 
			Elf.utils.remove( _this.pagingWarp );
			//传入新数据
			_this.creatGrid({});
			_this.pageNumber({});	
			
			return
		}
		
		if( has( tt , 'un-success') ){
			//请求数据，更新视图
			console.log('未审核通过的医院查找中...');			
			checkState = Elf.components.grid.methods.getCheckedData(_this.grid);
			
			if( Elf.utils.isEmptyObject( checkState ) ){
				
			    Elf.components.toast({text:'没有选中数据',holdtime:800});
				return
			}
			
		    Elf.utils.each(checkState ,function(index , item){ 
		    	
		    	checkArr[index] = item.fId;
		    
		    });
			
			obj.ids = checkArr;
			obj.fCheckState = 0;
			console.log( obj );		
			
			subCheckState( obj , _this );		
			
			return			
			
			//请求数据
			Elf.utils.remove( _this.gridWarp ); 
			Elf.utils.remove( _this.pagingWarp );
			//传入新数据
			_this.creatGrid([]);
			_this.pageNumber([]);	
						
			return
		}		
		
	}
	
		
})();


/*--*****省级> 申报材料审核 > 协同单位审核（实践基地）******--*/	
;(function(){
	
	var $creatE,
		$pTo,
		gridHdata,
		currentPage,
		pageSize;
		
	currentPage = 1,
	pageSize = 10;			
	$creatE = Elf.controls.createElement;
	$pTo = Elf.controls.appendTo;	
	
	gridHdata = [	    	
		{
			title:"编号",
			name:"",
			width:48,
			align:"center",
			fixedColumn:true,
			checkCol:true,
			valign:"middle",
			renderer:function(name,rowIndex,rowData){
				return '<div class="fixedCell">'+ (rowIndex+1) +'</div>';
			}
		},
		{
			title:"审核状态",
			name:"",
			width:48,
			align:"center",
			fixedColumn:false,
			checkCol:false,
			valign:"middle",
			renderer:function(name,rowIndex,rowData){
				var str = '';
				if(rowData.fCheckState == 1){
					
					str = '已通过';
					
				}else if(rowData.fCheckState == 0){
					
					str = '未通过';
				}
				
				return str;
			}
		}
		,{
			title:"修改状态",
			name:"",
			width:100,
			align:"center",
			fixedColumn:false,
			valign:"middle",
			renderer:function(name,rowIndex,rowData){

				var str1 = '',
					str2 = '';
				
				if( rowData.fEditableState == 1 ){
					
					str1 = 'checked="checked" ';
					str2 = '';
				}
				if( rowData.fEditableState == 0 ){
					
					str2 = 'checked="checked" ';
					str1 = '';
				}
				return '<label><input class="fEditable1" name="zt'+ rowIndex +'" type="radio" '+  str1 +' />可修改</label><label><input class="fEditable0" name="zt'+ rowIndex +'" type="radio"  '+  str2 +'  />不可修改 </label>' ;
			}
		}
		,{
			title:"培训基地（医院）名称",
			name:"",
			width:100,
			align:"center",
			fixedColumn:false,
			valign:"middle",
			renderer:function(name,rowIndex,rowData){
			
	
				return rowData.baseName;
	
			}
		}
		,{
			title:"基层培养基地",
			name:"查看",
			width:60,
			align:"center",
			renderer:function(name,rowIndex,rowData){
				
				var str = "<a class='look'  href='javascript:;'>"+ name +"</a>";
				return str;
				
			}
		}
	
	];	
	
	//请求数据
	function getBaseData( _this ) {
		currentPage = 1;
	    var args = {};
	    args.fType = "5";
	    args.fProvince=use_info.province;
	    args.page = currentPage;
	    args.pageSize = pageSize;	    
	    var service = {
	        serviceModule: serviceInfo.serviceModule,
	        serviceNumber: '100090150',
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
	
	//传递修改状态
	function subEditable( args ) {
	    var service = {
	        serviceModule: serviceInfo.serviceModule,
	        serviceNumber: '100090180',
	        token: use_info.token,
	        args: args
	    };
	    commonLogic.serviceCaller(service, function (data) {
	        //console.log(JSON.stringify(data));
	        //alert(data.flag);
	        if(data.flag == "true"){
	          
	        }else{
	            Elf.components.toast({text:data.error});
	        }
	    });
	}		

	//传递审核状态
	function subCheckState( args , _this ) {
	    var service = {
	        serviceModule: serviceInfo.serviceModule,
	        serviceNumber: '100090160',
	        token: use_info.token,
	        args: args
	    };
	    commonLogic.serviceCaller(service, function (data) {

	        if(data.flag == "true"){
	        	
	        	Elf.components.toast({text:'审核成功',holdtime:600});	        	
				
				updateGrid( _this );

	          
	        }else{
	            Elf.components.toast({text:data.error});
	        }
	    });
	}		

	//请求分页数据
	function getPageData( _this ) {
	    var args = {};
	    args.fType = "5";
	    args.fProvince=use_info.province;
	    args.page = currentPage;
	    args.pageSize = pageSize;
	    var service = {
	        serviceModule: serviceInfo.serviceModule,
	        serviceNumber: '100090140',
	        token: use_info.token,
	        args: args
	    };
		console.log( args );
	    commonLogic.serviceCaller(service, function (data) {
	        
	        //console.log(JSON.stringify(data));
	        if(data.flag == "true"){
	        	
	        	console.log( data );	
				Elf.components.grid.methods.update(_this.grid , data.result.result );

	        }else{
	        	
	            Elf.components.toast({text:data.error});
	        }
	    });
	}	
	
	//查询功能返回数据
	function getQueryData( args , _this ) {
	    args.page = currentPage;
	    args.pageSize = pageSize;	
	    var service = {
	        serviceModule: serviceInfo.serviceModule,
	        serviceNumber: '100090150',
	        token: use_info.token,
	        args: args
	    };
		console.log( args );
	    commonLogic.serviceCaller(service, function (data) {
	        
	        //console.log(JSON.stringify(data));
	        if(data.flag == "true"){
	        	
	        	console.log( data );
				Elf.components.grid.methods.update(_this.grid , data.result.result );
	        }else{
	        	
	            Elf.components.toast({text:data.error});
	        }
	    });
	}		
	
	//更新表格数据
	function updateGrid( _this ){

	    var args = {};
	    args.fType = "5";
	    args.fProvince=use_info.province;
	    args.page = currentPage;
	    args.pageSize = pageSize;	    
	    var service = {
	        serviceModule: serviceInfo.serviceModule,
	        serviceNumber: '100090150',
	        token: use_info.token,
	        args: args
	    };

	    commonLogic.serviceCaller(service, function (data) {
	        
	        //console.log(JSON.stringify(data));
	        if(data.flag == "true"){
	        	
	        	console.log( data );
				Elf.components.grid.methods.update( _this.grid , data.result.result );
				

	        }else{
	        	
	            Elf.components.toast({text:data.error});
	        }
	    });		
		
	}



	function CooperativeUnits(){

		//页面容器	
		this.content = document.querySelector(".elf_fiexd_center");
		this.warp = $creatE('div','training-base-warp full p10');	
		
		getBaseData(this);
		
	}
	
	//协同单位审核接口
	zyjdModuleByGao.cooperativeUnits = CooperativeUnits;	
	
	CooperativeUnits.prototype.init = function ( data ){
		var _this = this; 
		
		_this.content.innerHTML = '';
		$pTo( _this.warp , _this.content );
			
		this.query();
		this.creatGrid(data);
		this.pageNumber( data );
		
	
	}

	//查询/审核模块
	CooperativeUnits.prototype.query = function(){
		var queryWarp,
			findHospital,
			FilterHospital,
			batchHtml,
			batchStrArr,
			_this;
		
		_this = this;
		
		queryWarp = $creatE('div','wfull');
		conditionQuery = $creatE( 'div' , 'wfull train-base prl6' );	//	条件查询
		batchSelection = $creatE( 'div' , 'wfull check-hospital ptb12 prl6' );	//批量选择

		batchHtml = '';
		batchStrArr = ['第一批','第二批','第三批','第四批','第五批','第六批'];
		var batchList = data.result.batchList;
		for (var i = 0; i < batchList.length; i++) {
			
			batchHtml += '<option value="'+  batchList[i].fBatch +'">'+ batchStrArr[ batchList[i].fBatch -1 ] +'</option>';
		
		}
		
		conditionQuery.innerHTML = '<div class="hfull pr20" ><div>培训基地（医院）名称 : </div><div><input type="text" name="fName" class="hospitalName prl5 ptb4 getvalue" /></div></div><div class="hfull pr20" ><div class="" > 批次 : </div><div class="" ><select name="fBatch" class="pici getvalue" ><option value="">请选择</option>'+ batchHtml +'</select></div></div><div class="hfull pr20" ><div class="" > 审核状态 : </div><div class="" ><select name="fCheckState" class="zhuangtai getvalue" ><option value="">请选择</option><option value="1">审核通过</option><option value="0">审核未通过</option></select></div></div><div class="hfull pr20" ><button class="btn conditionQuery prl24 ptb6" value="查询" > 查询 </button></div>';
		
		batchSelection.innerHTML = '<div class="pr20 hfull" ><div class="prl6 hfull" ><span >审核 :</span></div></div><div class="pr20 hfull" ><input class="prl8 ptb4 success btn"  type="button" value="审核通过" /><input class="prl8 ptb4 un-success btn"  type="button" value="审核不通过" /></div>';
		
		//绑定事件
		conditionQuery.addEventListener('click' , function( ev ){
			
			_this.conditionQueryFn.call( conditionQuery , ev , _this );
			
		} );
		batchSelection.addEventListener('click', function( ev ){
			
			_this.batchSelectionFn.call( batchSelection , ev , _this );
			
		} );
		
		$pTo( conditionQuery , queryWarp );
		$pTo( batchSelection , queryWarp );		
		$pTo( queryWarp , _this.warp );

	}
	
	// 创建表格
	CooperativeUnits.prototype.creatGrid = function( data ){
		
		var gridWarp,
			_this = this,
			dataArr;
		
		dataArr = data.result.result ? data.result.result : [];
		gridWarp = $creatE( 'div','wfull JD-grid-page' );
		this.gridWarp = gridWarp;
		
		$pTo( gridWarp , _this.warp );		

		this.grid = Elf.components.grid({
			
			cols:gridHdata,
			data:dataArr.slice( 0 , pageSize ),
			fullWidthRows:true,
			onCellSelected:function(evt,item,rowIndex,colIndex){	    			
	    		var tt = evt.target;
	    		
	    		if( Elf.utils.hasClass(tt,"fEditable1") ){
	    			
					var obj = {};
					obj.fId = item.fId;
					obj.fEditable = 1;
					subEditable( obj );
	    			console.log(obj);
	    			return
	    		}
	    		
	    		if( Elf.utils.hasClass(tt,"fEditable0") ){
	    			

					var obj = {};
					obj.fId = item.fId;
					obj.fEditable = 0;					
					subEditable( obj );
	    			console.log(obj);
	    			return
	    		}
	    		
	    		if( Elf.utils.hasClass(tt,"look") ){
	    			
	    			 					window.open("declareTable.html?token="+use_info.token+"&type=8"+"&fBatchInfoId="+item.fBatchInfoId);
	    			
	    		}

			},
			target:gridWarp
		});

	}

	// 分页组件
	CooperativeUnits.prototype.pageNumber = function ( data ){
		
		var JDpageNumber ,paging ,_this;
			_this = this;
			JDpageNumber = $creatE('div','JD-grid-pageNumber ptb20');
			this.pagingWarp = JDpageNumber;
	    	paging = Elf.components.paging({
	    		
		        total: data.total, //数据总数
		        currentPage: currentPage,   
		        pageSize:pageSize,       
		        maxPager:5,     //分页组件最多显示的页码数量结构
		        showStatus:false,    
		        statusFormat:"共 <b>{{total}}</b> 条记录 <b>{{totalPage}}</b> 页 当前第 <b>{{currentPage}}</b> 页", 
		        onPagerChange:function(p){  //页码跳转函数 ， 函数有一个参数，就是当前点击的按钮对应的页码
		            
		            currentPage = p;
 					
 					//更新数据
					getPageData( _this );	

		        }
		        
	    	});
	    
	    $pTo( paging , JDpageNumber );
		$pTo( JDpageNumber , _this.warp);	
	}
	
	//条件查询
	CooperativeUnits.prototype.conditionQueryFn = function(ev , _this ){
		var e,
			tt,
			has,
			hospital,
			infos,
			infosObj,
			hasValue;
			
		has = Elf.utils.hasClass;		
		e = Elf.getEvent(ev);
		tt = Elf.getEventSource(ev);		
		
		hasValue = false;
		infosObj = {};
		hospital = this.getElementsByClassName('hospitalName')[0];
		infos = this.getElementsByClassName('getvalue');		
		
		if( has( tt , 'conditionQuery') ){
			
							
			for (var i = 0; i < infos.length; i++) {
				
				if( infos[i].value !== '' ){
					
					hasValue = true;
				}
				
			}
			
			if( !hasValue ){

 				Elf.components.toast({text:'请选择查询条件',holdtime:600});
				return				
				
			}else{
							
				for (var i = 0; i < infos.length; i++) {
					
					infosObj[infos[i].name] = infos[i].value;
					
				}				
							
				getQueryData( infosObj , _this );	
							
			}

		}

	}
	
	//审核
	CooperativeUnits.prototype.batchSelectionFn = function( ev , _this ){
	
		var e,
		tt,
		has,
		infos,
		checkState,
		checkArr,
		obj;

		has = Elf.utils.hasClass;		
		e = Elf.getEvent(ev);
		tt = Elf.getEventSource(ev);
		obj = {};
		checkArr = [];
		
		if( has( tt , 'success') ){

			console.log('审核通');
			
			checkState = Elf.components.grid.methods.getCheckedData(_this.grid);
			
			if( Elf.utils.isEmptyObject( checkState ) ){
				
			    Elf.components.toast({text:'没有选中数据',holdtime:600});
				return
			}
			
		    Elf.utils.each(checkState ,function(index , item){ 
		    	
		    	checkArr[index] = item.fId;
		    
		    });
			
			obj.ids = checkArr;
			obj.fCheckState = 1;
			console.log( obj );		
			
			subCheckState( obj , _this ); 
			
			return
		}
		
		if( has( tt , 'un-success') ){
			
			console.log('审核未通过');
			
			checkState = Elf.components.grid.methods.getCheckedData(_this.grid);
			
			if( Elf.utils.isEmptyObject( checkState ) ){
				
			    Elf.components.toast({text:'没有选中数据',holdtime:600});
				return
			}
			
		    Elf.utils.each(checkState ,function(index , item){ 
		    	
		    	checkArr[index] = item.fId;
		    
		    });
			
			obj.ids = checkArr;
			obj.fCheckState = 0;
			console.log( obj );		
			
			subCheckState( obj , _this ); 

			return
		}		
		
	}
		
	
})();

