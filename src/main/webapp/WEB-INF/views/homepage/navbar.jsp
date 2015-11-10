    <!-- Navbar path of home -->
    <nav class="navbar navbar-default">
    	<!-- Set container full width size -->
    	<div class="container-fluid">
    		<div class="navbar-header">
    		<!-- Start collapse button -->
    			<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
    				<span class="icon-bar"></span>
    				<span class="icon-bar"></span>
    				<span class="icon-bar"></span>
    			</button>
    			<!-- Set name or logo of page -->
    			<a class="navbar-brand" href="${pageContext.request.contextPath }/">
 					Manager Employee
    			</a>
    		</div>
    		<!-- Menu -->
    		<div class="collapse navbar-collapse" id="myNavbar">
    			<ul class="nav navbar-nav">
    				<li class="active"><a href="#">Home</a></li>
    				<li><a href="#function1" class="smooth">Filter 1</a></li>
    				<li><a href="#function2" class="smooth">Employee Table</a></li>
    				<li><a href="#function3" class="smooth">Footer</a></li>
    			</ul>
    			<!-- Create login and sign up button -->
    			<ul class="nav navbar-nav navbar-right">
    				<li>
    					<a href="#">
    						<span class="glyphicon glyphicon-envelope"></span><p1>&nbsp;${userSession.email }</p1>
    					</a>
    				</li>
    				<li>
    					<a href="${pageContext.request.contextPath}/user/logout">
    						<span class="glyphicon glyphicon-log-in"></span> Logout
    					</a>
    				</li>
    			</ul>
    		</div>
    	</div>
    </nav>

    
