// WelcomeHandler.java
package com.wipro.lambda.firstlambda.handler;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;

//public class WelcomeHandler implements RequestHandler<Request, Response> {
//    @Override
//    public Response handleRequest(Request request, Context context) {
//        LambdaLogger logger = context.getLogger();
//        logger.log("Processing question from " + request.name());
//        return new Response("Hello, " + request.name());
//    }
//}

public class WelcomeHandler implements RequestHandler<QuestionRequest, AnswerResponse> {

    @Override
    public AnswerResponse handleRequest(QuestionRequest request, Context context) {
        LambdaLogger logger = context.getLogger();
        logger.log("Received question from " + request.name() + ": " + request.question());

        String answer;

        switch (request.question().toLowerCase()) {
            case "what is aws lambda?":
                answer = "AWS Lambda is a serverless compute service that runs your code in response to events.";
                break;
            case "what is java?":
                answer = "Java is a high-level, class-based, object-oriented programming language.";
                break;
            default:
                answer = "Sorry " + request.name() + ", I don't have an answer for that.";
        }

        return new AnswerResponse(answer);
    }
}
